import pygame
import math
from Coin import *
from CoinBlock import *
from Goomba import *
from Sprite import *

class Mario(Sprite):
    def __init__(self, _model):  
        super(Mario, self).__init__(0,0,0,0)
        self.model = _model
        self.marioImageCounter = 0
        self.marioImages = []
        self.leftMarioImages =[]
        self.lazyLoad()
        self.currentImageIndex = 0
        self.vertVel = 1.0
        self.lastTouchCounter = 0
        isMario = True


    def update(self, model):
        #keeps mario locked on one point as screen scrolls
        self.x = 150

        #gravity
        self.vertVel += 3.5
        self.y += self.vertVel
        self.lastTouchCounter += 1 #increments lastTouchCounter unless on the ground

        if self.y > 400:
            self.vertVel = 0.0
            self.y = 400
            self.lastTouchCounter = 0

        for x in self.model.sprites:
            print('for looping: at' + x)


    def draw(self, screen):
        print (self.currentImageIndex)
        #meaning animating right
        if (self.currentImageIndex <= 4):
            screen.blit(self.marioImages[self.currentImageIndex], (self.x, self.y))
        #meaning animating left
        if(self.currentImageIndex > 4):
            screen.blit(self.leftMarioImages[ self.currentImageIndex - 5 ], (self.x, self.y))

    def animateMario(self, direction):
        self.marioImageCounter += 1

        if direction == "right":
            self.currentImageIndex = math.floor(self.marioImageCounter/5) % 5

        if direction == "left":
            self.currentImageIndex = (math.floor(self.marioImageCounter/5) % 5) + 5 #left mario indexes are > 5


    def lazyLoad(self):
        print ('lazy load mario images')
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

