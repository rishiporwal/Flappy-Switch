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
    GameOver()
})
sprites.onDestroyed(SpriteKind.BottomPipe, function (sprite) {
    MakePipe()
    Score += 1
    ScoreSprite.setText(convertToText(Score))
    ScoreSprite.x = 80
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
for (let index2 = 0; index2 <= 69 - Height; index2++) {
        spriteutils.drawTransparentImage(Pipe, PipeTopSprite.image, 1, index2 - 1)
    }
    PipeTopSprite.top = 0
    PipeTopSprite.left = 160
    PipeTopSprite.vx = -50
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.TopPipe, function (sprite, otherSprite) {
    GameOver()
})
function GameOver () {
    if (blockSettings.exists("HighScore")) {
        blockSettings.writeNumber("HighScore", Math.max(blockSettings.readNumber("HighScore"), Score))
    } else {
        blockSettings.writeNumber("HighScore", Score)
    }
    game.showLongText("Game Over! \\n \\n Score: " + convertToText(Score) + " \\n \\n High Score: " + blockSettings.readNumber("HighScore"), DialogLayout.Center)
    game.reset()
}
sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    GameOver()
})
let BirdSprite: Sprite = null
let ScoreSprite: TextSprite = null
let Score = 0
game.setDialogFrame(assets.image`Frame`)
game.setDialogCursor(assets.image`Blank`)
let Height = 0
let PipeBottomSprite: Sprite = null
let PipeTopSprite: Sprite = null
Score = 0
ScoreSprite = textsprite.create(convertToText(Score))
ScoreSprite.setOutline(1, 6)
ScoreSprite.z = 100
ScoreSprite.y = 10
let Background = sprites.create(assets.image`Background`, SpriteKind.bg)
Background.vx = -20
BirdSprite = sprites.create(assets.image`Bird`, SpriteKind.Player)
BirdSprite.setFlag(SpriteFlag.AutoDestroy, true)
BirdSprite.setPosition(20, 17)
BirdSprite.ay = 200
scene.setBackgroundColor(7)
let PipeTop = assets.image`PipeTop`
let Pipe = assets.image`Pipe`
let PipeTransition = assets.image`PipeTransition`
MakePipe()
game.onUpdate(function () {
    if (Background.right < 160) {
        Background.left = 0
    }
})
