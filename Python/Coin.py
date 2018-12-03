import pygame
import random

#from CoinBlock import *
from Sprite import *

class Coin(Sprite):
    def __init__(self, model, x, y, w, h):  
        super(Coin, self).__init__(x,y,w,h)
        self.w = 30
        self.h = 30
        self.vertVel = -30.0
        self.horVel = self.randomHorVel()
        self.coinImage = pygame.image.load("images/coin.png")
        self.model = model
        self.isCoin = True

    def update(self):
        #gravity and horVel
        self.vertVel += 3.5
        self.y += self.vertVel
        self.x += self.horVel

        #horVel converging to 0
        if self.horVel > .25 or self.horVel < .25:
            self.horVel = self.horVel/1.4
        else:    
            self.horVel = 0.0

        #delets coin if off screen
        if self.y > 600:
            self.model.sprites.remove(self)

    def draw(self, screen):
        screen.blit(self.coinImage, (self.x - self.model.screenPos, self.y))

    def randomHorVel(self):
        return random.randint(-100,100)/5.0