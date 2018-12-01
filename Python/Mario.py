import pygame
from Coin import *
from CoinBlock import *
from Goomba import *
from Sprite import *

class Mario(Sprite):
    def __init__(self, _model):  
        super(Mario, self).__init__(0,0,0,0)
        self.model = _model
        self.marioImage = pygame.image.load("images/mario1.png")
        self.vertVel = 1.0
        self.lastTouchCounter = 0
        isMario = True


    def update(self, model):
        #keeps mario locked on one point as screen scrolls
        self.x = 150

        #gravity
        self.vertVel += 2.0
        self.y += self.vertVel
        self.lastTouchCounter += 1 #increments lastTouchCounter unless on the ground

        if self.y > 400:
            self.vertVel = 0.0
            self.y = 400
            self.lastTouchCounter = 0

        for x in self.model.sprites:
            print('for looping: at' + x)


    def draw(self, screen):
        screen.blit(self.marioImage, (self.x, self.y))

