import pygame
from Coin import *
from CoinBlock import *
from Goomba import *
from Sprite import *

class Mario(Sprite):
    def __init__(self, _model):  
        print ('Mario constructor')
        self.model = _model
        self.marioImage = pygame.image.load("images/mario1.png")
        isMario = True


    def update(self):
        print ('Mario update method')
        for x in self.model.sprites:
            print('for looping: at' + x)


    def draw(self, screen):
        print ('Drawing mario')
        screen.blit(self.marioImage, self.model.rect)

