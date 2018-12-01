import pygame
from Sprite import *

class Brick(Sprite):

    def __init__(self, model, x, y, w, h):
        super(Brick, self).__init__(x,y,w,h)
        self.model = model
        isBrick = True


    def update(self, model):
        print ('brick update')

    def draw(self, screen):
        pygame.draw.rect(screen, (255,255,255), [self.x-self.model.screenPos, self.y, self.x+self.w, self.y + self.h], 3)

        


