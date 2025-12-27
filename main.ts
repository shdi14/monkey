namespace SpriteKind {
    export const Enemy2 = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    одиночныйПрыжок = false
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`collectibleBlueCrystal`, function (sprite, location) {
    myEnemy = sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111bf.......
        ......fffcdb1bdffff.....
        ....fc111cbfbfc111cf....
        ....f1b1b1ffff1b1b1f....
        ....fbfbffffffbfbfbf....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `, SpriteKind.Enemy)
    myEnemy.follow(mySprite, 80)
    tiles.setTileAt(location, assets.tile`transparency16`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile34`, function (sprite, location) {
    двойной_прыжок = 1
    tiles.setTileAt(location, assets.tile`transparency16`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile24`, function (sprite, location) {
    scene.setBackgroundImage(assets.image`background`)
    tiles.setTilemap(tilemap`level1`)
    animation.runMovementAnimation(
    mySprite,
    animation.animationPresets(animation.flyToCenter),
    100,
    false
    )
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile32`, function (sprite, location) {
    info.changeScoreBy(-150)
    tiles.setTileAt(location, assets.tile`transparency16`)
    tiles.setTileAt(tiles.getTileLocation(168, 11), assets.tile`myTile34`)
    tiles.setTileAt(tiles.getTileLocation(168, 12), assets.tile`myTile34`)
})
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.B.isPressed()) {
        controller.moveSprite(mySprite, 0, 0)
        if (!(sprites.readDataBoolean(crosshaire2, "active"))) {
            crosshaire2 = sprites.createProjectileFromSprite(assets.image`blank`, mySprite, 0, 0)
            mySprite.sayText("" + Math.round(crosshaire2.x) + ":" + Math.round(crosshaire2.y))
            if (sprites.readDataBoolean(mySprite, "isRight")) {
                crosshaire2.setPosition(Math.round(mySprite.x) + 16, Math.round(mySprite.y))
                aimX = 75
            } else {
                crosshaire2.setPosition(Math.round(mySprite.x) - 16, Math.round(mySprite.y))
                aimX = -75
            }
            sprites.setDataBoolean(crosshaire2, "active", true)
        }
        if (controller.left.isPressed()) {
            crosshaire2.setPosition(Math.round(mySprite.x) - 16, Math.round(mySprite.y))
            aimX = -75
            mySprite.setImage(assets.image`standLeft`)
            sprites.setDataBoolean(mySprite, "isRight", false)
        } else if (controller.right.isPressed()) {
            crosshaire2.setPosition(Math.round(mySprite.x) + 16, Math.round(mySprite.y))
            aimX = 75
            mySprite.setImage(assets.image`standLeft`)
            sprites.setDataBoolean(mySprite, "isRight", true)
        } else if (controller.up.isPressed()) {
            crosshaire2.setPosition(crosshaire2.x, crosshaire2.y - 4)
            aimY = aimY - 4
        } else if (controller.down.isPressed()) {
            crosshaire2.setPosition(crosshaire2.x, crosshaire2.y + 4)
            aimY = aimY + 4
        } else {
            aimY = 0
        }
    } else {
        controller.moveSprite(mySprite, 100, 0)
        if (controller.left.isPressed()) {
            animation.runImageAnimation(
            mySprite,
            assets.animation`walk left`,
            150,
            false
            )
            sprites.setDataBoolean(mySprite, "isRight", false)
        } else if (controller.right.isPressed()) {
            animation.runImageAnimation(
            mySprite,
            assets.animation`walk right`,
            150,
            false
            )
            sprites.setDataBoolean(mySprite, "isRight", true)
        } else if (controller.up.isPressed()) {
            if (одиночныйПрыжок == true) {
                уровеньГравитации = 200
            } else {
                if (двойной_прыжок == 1) {
                    уровеньГравитации = 400
                }
            }
            simplified.gravity_jump(mySprite, уровеньГравитации)
            одиночныйПрыжок = true
            animation.runImageAnimation(
            mySprite,
            assets.animation`jump`,
            150,
            false
            )
        } else {
            aimY = 0
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile33`, function (sprite, location) {
    timer.after(3000, function () {
        tiles.setTileAt(location, assets.tile`myTile26`)
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile25`, function (sprite, location) {
    info.changeScoreBy(-150)
    tiles.setTileAt(location, assets.tile`transparency16`)
    tiles.setTileAt(tiles.getTileLocation(105, 10), assets.tile`myTile32`)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(myEnemy, effects.fire, 100)
    info.changeScoreBy(20)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`orange bauble`, function (sprite, location) {
    if (controller.right.isPressed()) {
        mySprite.x += 16
        mySprite.x += 16
        mySprite.x += 16
    }
    if (controller.left.isPressed()) {
        mySprite.x += -16
        mySprite.x += -16
        mySprite.x += -16
    }
    if (controller.up.isPressed()) {
        mySprite.y += -16
        mySprite.y += -16
        mySprite.y += -16
    }
    if (controller.down.isPressed()) {
        mySprite.y += 16
        mySprite.y += 16
        mySprite.y += 16
    }
    tiles.setTileAt(location, assets.tile`transparency16`)
    info.changeScoreBy(5)
})
controller.B.onEvent(ControllerButtonEvent.Released, function () {
    mySprite.sayText("" + aimX + ":" + Math.map(aimY, 0, 16, 0, 75), 500, false)
    projectile = sprites.createProjectileFromSprite(assets.image`фыва`, mySprite, aimX, Math.map(aimY, 0, 16, 0, 75))
    sprites.setDataBoolean(crosshaire2, "active", false)
    projectile.setFlag(SpriteFlag.ShowPhysics, true)
    projectile.setFlag(SpriteFlag.BounceOnWall, true)
    sprites.destroy(crosshaire2)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile16`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`уровень1`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile20`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    info.setLife(15)
    info.changeScoreBy(10000)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile17`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level14`)
    background.fill(10)
    scene.setBackgroundImage(background)
    animation.runMovementAnimation(
    mySprite,
    animation.animationPresets(animation.flyToCenter),
    100,
    false
    )
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`orange bauble0`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`уровень2`)
    background.fill(13)
    scene.setBackgroundImage(background)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    tiles.setWallAt(tiles.locationInDirection(tiles.locationOfSprite(mySprite), CollisionDirection.Bottom), true)
    tiles.setTileAt(tiles.locationInDirection(tiles.locationOfSprite(mySprite), CollisionDirection.Bottom), assets.tile`myTile3`)
})
scene.onOverlapTile(SpriteKind.Player, sprites.builtin.coral0, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`уровень7`)
    for (let index = 0; index < 1; index++) {
        myEnemy2 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 4 4 . . . . . . . 
            . . . . . 4 2 2 4 2 4 . . . . . 
            . . 4 4 4 4 4 2 2 2 4 4 . . . . 
            . . 2 2 a a 2 2 2 a a 4 4 . . . 
            . 4 4 4 2 2 4 4 4 2 4 4 4 . . . 
            . 4 4 2 2 2 2 4 4 2 2 4 4 . . . 
            . . 2 4 4 4 2 2 4 4 2 2 4 . . . 
            . . . . 4 4 4 2 2 4 4 4 . . . . 
            . . . . . 4 4 4 2 4 4 . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(myEnemy2, assets.tile`myTile21`)
        myEnemy2.follow(mySprite)
    }
    tiles.setTileAt(location, assets.tile`transparency16`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`chest2`, function (sprite, location) {
    game.over(true)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level7`)
    background.fill(10)
    scene.setBackgroundImage(background)
    animation.runMovementAnimation(
    mySprite,
    animation.animationPresets(animation.flyToCenter),
    100,
    false
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy2, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`chest1`, function (sprite, location) {
    scene.setBackgroundImage(assets.image`background2`)
    tiles.setTilemap(tilemap`level2`)
    animation.runMovementAnimation(
    mySprite,
    animation.animationPresets(animation.flyToCenter),
    100,
    false
    )
    mySprite.say("Level 2!", 500)
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    sprite.setVelocity(0, 0)
    tiles.setTileAt(location, assets.image`splash1`)
    timer.after(100, function () {
        tiles.setTileAt(location, assets.image`splash2`)
    })
    timer.after(200, function () {
        tiles.setTileAt(location, assets.image`splash3`)
    })
    timer.after(300, function () {
        tiles.setWallAt(location, false)
        tiles.setTileAt(location, assets.tile`transparency16`)
        info.changeScoreBy(1)
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile27`, function (sprite, location) {
    scene.setBackgroundImage(assets.image`background`)
    tiles.setCurrentTilemap(tilemap`level1`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`poison pit`, function (sprite, location) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(myEnemy2, effects.fire, 100)
    info.changeScoreBy(10)
    sprites.destroy(myEnemy2, effects.spray, 500)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile26`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    animation.runImageAnimation(
    myEnemy,
    [img`
        ........................
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .....fffc1111111f.......
        ...fc111cd1111111f......
        ...f1b1b1b1111dddf......
        ...fbfbffcf11fcddf......
        ......fcf111111bbf......
        .......ccbdb1b1fcf......
        .......fffbfbfdff.......
        ........ffffffff........
        ........fffffffffff.....
        .........fffffc111cf....
        .........fffff1b1b1f....
        ..........ffffbfbfbf....
        ...........ffff.........
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ....7.fd11111111df......
        ...7..fd11111111df......
        ...7..fd11111111df......
        ...7..fddd1111dddff.....
        ...77.fbdbfddfbdbfcf....
        ...777fcdcf11fcdcfbf....
        ....77fffbdb1bdffcf.....
        ....fcb1bcffffff........
        ....f1c1c1ffffff........
        ....fdfdfdfffff.........
        .....f.f.f..............
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd111111111f......
        ......fd11111111df......
        ......fd11111111df......
        ......fcdd1111ddcff.....
        .......fbcf11fcbfbbf....
        .......ffbdb1bdffff.....
        ........fcbfbfdf........
        ........ffffffff........
        ......ffffffffff........
        .....fcb1bcffff.........
        ......ffbff.............
        ........................
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fdd111111ddf......
        ......fbdd1111dddf......
        ......fcdbfddfbdbf......
        .......fbcf11fcbfff.....
        .......ffb1111bcfbcf....
        ........fcdb1bdfbbbf....
        .......ffffffffffcf.....
        .....fcb1bcfffff........
        .....f1b1b1ffff.........
        ......ffbff.............
        ........................
        ........................
        ........................
        ........................
        ........................
        `],
    1500,
    false
    )
    info.changeLifeBy(-1)
    timer.after(500, function () {
    	
    })
})
let myEnemy2: Sprite = null
let projectile: Sprite = null
let aimY = 0
let aimX = 0
let crosshaire2: Sprite = null
let двойной_прыжок = 0
let myEnemy: Sprite = null
let одиночныйПрыжок = false
let уровеньГравитации = 0
let background: Image = null
let mySprite: Sprite = null
mySprite = sprites.create(assets.image`standLeft`, SpriteKind.Player)
info.setLife(10)
sprites.setDataBoolean(mySprite, "isRight", true)
let angle = 90
mySprite.ay = 500
scene.cameraFollowSprite(mySprite)
background = assets.image`background`
mySprite.setBounceOnWall(false)
scene.setBackgroundImage(background)
tiles.setTilemap(tilemap`level1`)
уровеньГравитации = 200
одиночныйПрыжок = true
