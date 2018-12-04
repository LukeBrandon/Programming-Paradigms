import pygame
import math
from Coin import *
from CoinBlock import *
from Goomba import *
from Sprite import *

class Mario(Sprite):
    def __init__(self, _model):  
        super(Mario, self).__init__(150,300,60,95)
        self.model = _model
        self.marioImageCounter = 0
        self.marioImages = []
        self.leftMarioImages = []
        self.lazyLoad()
        self.currentImageIndex = 0
        self.vertVel = 1.0
        self.lastTouchCounter = 0
        self.isMario = True


    def update(self):
        #gravity
        self.vertVel += 3.5
        self.y += self.vertVel
        self.lastTouchCounter += 1 #increments lastTouchCounter unless on the ground

        #iterate all sprites here
        for x in range (0,len(self.model.sprites)):
            thisSprite = self.model.sprites[x]
            
            if self.collides(thisSprite):
                direction = self.pushOut(thisSprite)

                if direction == "bottom" and thisSprite.isCoinBlock == True and thisSprite.coins > 0:
                    tempCoin = Coin(self.model, (thisSprite.x + 4), (thisSprite.y - 30), 0, 0)
                    self.model.sprites.insert(len(self.model.sprites), tempCoin)
                    thisSprite.coins -= 1


    def draw(self, screen):
        #meaning animating right
        if (self.currentImageIndex <= 4):
            screen.blit(self.marioImages[self.currentImageIndex], (self.x - self.model.screenPos, self.y))
        #meaning animating left
        if(self.currentImageIndex > 4):
            screen.blit(self.leftMarioImages[ self.currentImageIndex - 5 ], (self.x - self.model.screenPos, self.y))

    def animateMario(self, direction):
        self.marioImageCounter += 1

        if direction == "right":
            self.currentImageIndex = math.floor(self.marioImageCounter/5) % 5

        if direction == "left":
            self.currentImageIndex = (math.floor(self.marioImageCounter/5) % 5) + 5 #left mario indexes are > 5


    def oldPosition(self):
        self.prevX = self.x
        self.prevY = self.y

    def lazyLoad(self):
        self.marioImages = [
            pygame.image.load("images/mario1.png"), 
            pygame.image.load("images/mario2.png"),
            pygame.image.load("images/mario3.png"),
            pygame.image.load("images/mario4.png"),
            pygame.image.load("images/mario5.png")
        ]

        self.leftMarioImages = [
            pygame.image.load("images/leftMario1.png"), 
            pygame.image.load("images/leftMario2.png"),
            pygame.image.load("images/leftMario3.png"),
            pygame.image.load("images/leftMario4.png"),
            pygame.image.load("images/leftMario5.png")
        ]

