---
title: "HUD Render (Data Type)"
description: "An Object or Array of objects used to define how a resource or cooldown bar should be rendered."
navigation_title: "HUD Render"
---

An [Object](/docs/datapack/data-types/object) or [Array](/docs/datapack/data-types/array) of objects used to define how a resource or cooldown bar should be rendered.

> If the specified HUD render is an array of objects, then the HUD render will choose the first object that is allowed to be rendered (its `should_render` field set to `true`) and its condition fulfilled (or if its `condition` field is absent) from top to bottom. The `order` value of the very first object will also be inherited by the following objects that do not have the `order` field specified.

##	Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`should_render` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the bar should be visible or not.
`sprite_location` | [Identifier](/docs/datapack/data-types/identifier) | `"origins:textures/gui/resource_bar.png"` | The path to the file in the assets which contains what the bar looks like. See the List of sprites for a list of files included by default in the mod.
`bar_index` | [Integer](/docs/datapack/data-types/integer) | `0` | The indexed position of the bar on the sprite to use. Please note that indexes start at `0`.
`icon_index` | [Integer](/docs/datapack/data-types/integer) | `0` | The indexed position of the icon on the sprite to use. Please note that indexes start at `0`.
`condition` | Entity Condition Type | _optional_ | If set (and `should_render` is true), the bar will only display when the entity with the power fulfills this condition.
`inverted` | [Boolean](/docs/datapack/data-types/boolean) | `false` | If set to true, inverts the way the hud render process (it'll look like its value is being decreased).
`order` | [Integer](/docs/datapack/data-types/integer) | *optional* | If specified, this determines the position of the HUD render when being rendered. The higher the `order` value is, the higher it is on the rendered HUD render stack.

## Examples

```json
"hud_render": {
    "sprite_location": "apoli:textures/gui/community/spiderkolo/resource_bar_03.png",
    "bar_index": 5
}
```

This definition shows the resource/cooldown as a white bar with a bone icon.

```json
"hud_render": [
	{
		"sprite_location": "apoli:textures/gui/community/spiderkolo/resource_bar_03.png",
		"bar_index": 3,
		"condition": {
			"type": "apoli:relative_health",
			"comparison": "<=",
			"compare_to": 0.5
		}
	},
	{
		"sprite_location": "apoli:textures/gui/community/spiderkolo/resource_bar_01.png",
		"bar_index": 4
	}
]
```
This definition will show the resource/cooldown as a white bar with a bone icon if the player has half or less of their max health. Otherwise, the resource/cooldown will be shown as a red bar with a heart icon.

This is how Apace's Apoli did it, use it to understand how the hud renders look, their location, how they are drawn on screen, etc but don't copy this code. Make it better using the new system you've created. Apace used Yarn mapping so take that into account too when analyzing:

```java
package io.github.apace100.apoli.screen;

import net.fabricmc.api.EnvType;
import net.fabricmc.api.Environment;
import net.minecraft.client.gui.DrawContext;

import java.util.ArrayList;
import java.util.List;

@Environment(EnvType.CLIENT)
public interface GameHudRender {

    List<GameHudRender> HUD_RENDERS = new ArrayList<>();

    void render(DrawContext context, float tickDelta);
}
```

```java
package io.github.apace100.apoli.util;

import io.github.apace100.apoli.Apoli;
import io.github.apace100.apoli.data.ApoliDataTypes;
import net.minecraft.entity.Entity;
import net.minecraft.network.PacketByteBuf;
import net.minecraft.util.Identifier;
import org.jetbrains.annotations.NotNull;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

public class HudRender implements Comparable<HudRender> {

    public static final HudRender DONT_RENDER = new HudRender(false, 0, 0, Apoli.identifier("textures/gui/resource_bar.png"), null, false, 0);

    private final List<HudRender> children = new LinkedList<>();

    private final Identifier spriteLocation;
    private final Predicate<Entity> condition;

    private final boolean shouldRender;
    private final boolean inverted;
    private final int barIndex;
    private final int iconIndex;

    private int order;

    public HudRender(boolean shouldRender, int barIndex, int iconIndex, Identifier spriteLocation, Predicate<Entity> condition, boolean inverted, int order) {
        this.shouldRender = shouldRender;
        this.barIndex = barIndex;
        this.iconIndex = iconIndex;
        this.spriteLocation = spriteLocation;
        this.condition = condition;
        this.inverted = inverted;
        this.order = order;
    }

    @Override
    public int compareTo(@NotNull HudRender other) {
        int orderResult = Integer.compare(this.order, other.order);
        return orderResult != 0 ? orderResult : this.spriteLocation.compareTo(other.spriteLocation);
    }

    public Identifier getSpriteLocation() {
        return spriteLocation;
    }

    public int getBarIndex() {
        return barIndex;
    }

    public int getIconIndex() {
        return iconIndex;
    }

    public boolean isInverted() {
        return inverted;
    }

    public boolean shouldRender() {
        return shouldRender;
    }

    public boolean shouldRender(Entity viewer) {
        return shouldRender && (condition == null || condition.test(viewer));
    }

    public Predicate<Entity> getCondition() {
        return condition;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public void send(PacketByteBuf buffer) {
        ApoliDataTypes.SINGLE_HUD_RENDER.send(buffer, this);
        ApoliDataTypes.MULTIPLE_HUD_RENDERS.send(buffer, children);
    }

    public static HudRender receive(PacketByteBuf buffer) {

        HudRender parentHudRender = ApoliDataTypes.SINGLE_HUD_RENDER.receive(buffer);
        ApoliDataTypes.MULTIPLE_HUD_RENDERS.receive(buffer).forEach(parentHudRender::addChild);

        return parentHudRender;

    }

    public void addChild(HudRender hudRender) {

        if (this == hudRender) {
            return;
        }

        if (hudRender.getOrder() == 0) {
            hudRender.setOrder(this.order);
        }

        this.children.add(hudRender);

    }

    public Optional<HudRender> getChildOrSelf(Entity viewer) {

        if (this.shouldRender(viewer)) {
            return Optional.of(this);
        }

        return children
            .stream()
            .filter(hudRender -> hudRender.shouldRender(viewer))
            .findFirst();

    }

}
```

```java
package io.github.apace100.apoli.screen;

import io.github.apace100.apoli.Apoli;
import io.github.apace100.apoli.component.PowerHolderComponent;
import io.github.apace100.apoli.power.HudRendered;
import io.github.apace100.apoli.util.ApoliConfigClient;
import io.github.apace100.apoli.util.HudRender;
import net.fabricmc.api.EnvType;
import net.fabricmc.api.Environment;
import net.minecraft.client.MinecraftClient;
import net.minecraft.client.gui.DrawContext;
import net.minecraft.client.network.ClientPlayerEntity;
import net.minecraft.entity.LivingEntity;
import net.minecraft.registry.tag.FluidTags;
import net.minecraft.util.Identifier;
import net.minecraft.util.math.MathHelper;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@Environment(EnvType.CLIENT)
public class PowerHudRenderer implements GameHudRender {

    private static final int BAR_WIDTH = 71;
    private static final int BAR_HEIGHT = 8;
    private static final int ICON_SIZE = 8;

    private static final int BAR_INDEX_OFFSET = BAR_HEIGHT + 2;
    private static final int ICON_INDEX_OFFSET = ICON_SIZE + 1;

    private final AtomicInteger x = new AtomicInteger();
    private final AtomicInteger y = new AtomicInteger();

    @Override
    public void render(DrawContext context, float delta) {

        MinecraftClient client = MinecraftClient.getInstance();
        ClientPlayerEntity player = client.player;

        if (player == null || !(Apoli.config instanceof ApoliConfigClient config)) {
            return;
        }

        int yOffset = 49;
        if (player.isSubmergedIn(FluidTags.WATER) || player.getAir() < player.getMaxAir()) {
            yOffset += 10;
        }

        if (player.getVehicle() instanceof LivingEntity livingVehicle) {
            int bars = MathHelper.clamp((int) Math.ceil(livingVehicle.getMaxHealth() / 20.0F), 1, 3) - 1;
            yOffset += bars * 10;
        }

        x.set(((context.getScaledWindowWidth() / 2) + 20) + config.resourcesAndCooldowns.hudOffsetX);
        y.set((context.getScaledWindowHeight() - yOffset) + config.resourcesAndCooldowns.hudOffsetY);

        PowerHolderComponent.KEY.get(player).getPowers()
            .stream()
            .filter(p -> p instanceof HudRendered)
            .map(p -> (HudRendered) p)
            .filter(HudRendered::shouldRender)
            .map(h -> Map.entry(h, h.getRenderSettings().getChildOrSelf(player)))
            .filter(entry -> entry.getValue().isPresent())
            .sorted(Map.Entry.comparingByValue(Comparator.comparing(Optional::get)))
            .forEach(entry -> {

                HudRendered hudRendered = entry.getKey();
                HudRender hudRender = entry.getValue().get();

                //  Draw the background texture of the resource bar
                Identifier spriteLocation = hudRender.getSpriteLocation();
                context.drawTexture(spriteLocation, x.get(), y.get(), 0, 0, BAR_WIDTH, 5);

                int barV = BAR_HEIGHT + hudRender.getBarIndex() * BAR_INDEX_OFFSET;
                int iconU = (BAR_WIDTH + 2) + hudRender.getIconIndex() * ICON_INDEX_OFFSET;

                //  Draw the fill portion of the resource bar
                int barFillWidth = (int) ((hudRender.isInverted() ? 1.0F - hudRendered.getFill() : hudRendered.getFill()) * BAR_WIDTH);
                context.drawTexture(spriteLocation, x.get(), y.get() - 2, 0, barV, barFillWidth, BAR_HEIGHT);

                //  Draw the icon of the resource bar
                context.drawTexture(spriteLocation, x.get() - ICON_SIZE - 2, y.get() - 2, iconU, barV, ICON_SIZE, ICON_SIZE);
                y.getAndAdd(-8);

            });

    }

}
```

```java
package io.github.apace100.apoli.screen.widget;

import io.github.apace100.apoli.util.TextAlignment;
import net.fabricmc.api.EnvType;
import net.fabricmc.api.Environment;
import net.minecraft.client.font.TextRenderer;
import net.minecraft.client.gui.DrawContext;
import net.minecraft.client.gui.widget.AbstractTextWidget;
import net.minecraft.text.Text;
import net.minecraft.util.Util;
import net.minecraft.util.math.MathHelper;

@Environment(EnvType.CLIENT)
public class ScrollingTextWidget extends AbstractTextWidget {

    private TextAlignment textAlignment = TextAlignment.CENTER;
    private final boolean hasShadow;

    public ScrollingTextWidget(int x, int y, int width, int height, Text text, boolean hasShadow, TextRenderer textRenderer) {
        super(x, y, width, height, text, textRenderer);
        this.hasShadow = hasShadow;
    }

    public void setAlignment(TextAlignment textAlignment) {
        this.textAlignment = textAlignment;
    }

    @Override
    public void renderButton(DrawContext context, int mouseX, int mouseY, float delta) {

        int left = this.getX() + 2;
        int right = this.getX() + this.getWidth() - 2;
        int top = this.getY();
        int bottom = this.getY() + this.getHeight();

        drawScrollingText(context, getTextRenderer(), this.getMessage(), textAlignment, left, top, right, bottom, getTextColor(), hasShadow);

    }

    protected static void drawScrollingText(DrawContext context, TextRenderer textRenderer, Text text, TextAlignment textAlignment, int left, int top, int right, int bottom, int color, boolean hasShadow) {

        int textWidth = textRenderer.getWidth(text);
        int height = (top + bottom - 9) / 2 + 1;
        int width = right - left;

        if (textWidth <= width) {
            context.drawText(textRenderer, text, textAlignment.horizontal(left, right, textWidth), height, color, hasShadow);
            return;
        }

        int horizontalDiff = textWidth - width;

        double d = (double) Util.getMeasuringTimeMs() / 1000.0;
        double e = Math.max((double) horizontalDiff * 0.5, 3.0);
        double f = Math.sin((Math.PI / 2) * Math.cos((Math.PI * 2) * d / e)) / 2.0 + 0.5;
        double g = MathHelper.lerp(f, 0.0, horizontalDiff);

        context.enableScissor(left, top, right, bottom);
        context.drawText(textRenderer, text, left - (int) g, height, color, hasShadow);
        context.disableScissor();

    }

}
```
