import pygame

from Sprite import *
#from Coin import *

class CoinBlock(Sprite):
    def __init__(self, model, x, y, w, h):
        super(CoinBlock, self).__init__(x,y,w,h)  
        self.w = 50
        self.h = 50
        self.model = model
        self.coins = 5
        self.shouldEjectCoin = False
        self.imageIndex = 0
        self.coinBlockImages = []
        self.lazyLoad()
        self.isCoinBlock = True

    def update(self):
        if self.coins < 1:
            self.imageIndex = 1
        else:
            self.imageIndex = 0

    def draw(self, screen):
        screen.blit(self.coinBlockImages[self.imageIndex], (self.x - self.model.screenPos, self.y))

    def lazyLoad(self):
        self.coinBlockImages = [
            pygame.image.load("images/coinBlock.png"), 
            pygame.image.load("images/depletedCoinBlock.png")
        ]
