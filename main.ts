namespace SpriteKind {
    export const BottomPipe = SpriteKind.create()
    export const TopPipe = SpriteKind.create()
    export const bg = SpriteKind.create()
}
/**
 * Games:
 * 
 * Flappy Bird
 * 
 * Galaga w/ pipes
 * 
 * Mario
 * 
 * Basket ball through pillar hoops
 * 
 * Gravity flipped
 */
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    BirdSprite,
    assets.animation`BirdAnimation`,
    70,
    false
    )
    BirdSprite.vy = randint(-100, -60)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.BottomPipe, function (sprite, otherSprite) {
    game.over(false)
})
sprites.onDestroyed(SpriteKind.BottomPipe, function (sprite) {
    MakePipe()
    info.changeScoreBy(1)
})
function MakePipe () {
    Height = randint(20, 60)
    PipeBottomSprite = sprites.create(image.create(23, Height), SpriteKind.BottomPipe)
    PipeBottomSprite.setFlag(SpriteFlag.AutoDestroy, true)
    spriteutils.drawTransparentImage(PipeTop, PipeBottomSprite.image, 0, 0)
    spriteutils.drawTransparentImage(PipeTransition, PipeBottomSprite.image, 1, 10)
    for (let index = 0; index <= Height - 11; index++) {
        spriteutils.drawTransparentImage(Pipe, PipeBottomSprite.image, 1, 11 + index)
    }
    PipeBottomSprite.bottom = 120
    PipeBottomSprite.left = 160
    PipeBottomSprite.vx = -50
    PipeTopSprite = sprites.create(image.create(23, 80 - Height), SpriteKind.TopPipe)
    PipeTopSprite.setFlag(SpriteFlag.AutoDestroy, true)
    spriteutils.drawTransparentImage(PipeTop, PipeTopSprite.image, 0, 70 - Height)
    spriteutils.drawTransparentImage(PipeTransition, PipeTopSprite.image, 1, 69 - Height)
    for (let index = 0; index <= 69 - Height; index++) {
        spriteutils.drawTransparentImage(Pipe, PipeTopSprite.image, 1, index - 1)
    }
    PipeTopSprite.top = 0
    PipeTopSprite.left = 160
    PipeTopSprite.vx = -50
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.TopPipe, function (sprite, otherSprite) {
    game.over(false)
})
sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    game.over(false)
})
let PipeTopSprite: Sprite = null
let PipeBottomSprite: Sprite = null
let Height = 0
let PipeTransition: Image = null
let Pipe: Image = null
let PipeTop: Image = null
let BirdSprite: Sprite = null
let Background = sprites.create(assets.image`Background`, SpriteKind.bg)
Background.vx = -20
BirdSprite = sprites.create(assets.image`Bird`, SpriteKind.Player)
BirdSprite.setFlag(SpriteFlag.AutoDestroy, true)
BirdSprite.setPosition(20, 17)
BirdSprite.ay = 200
scene.setBackgroundColor(7)
PipeTop = assets.image`PipeTop`
Pipe = assets.image`Pipe`
PipeTransition = assets.image`PipeTransition`
MakePipe()
game.onUpdate(function () {
    if (Background.right < 160) {
        Background.left = 0
    }
})
