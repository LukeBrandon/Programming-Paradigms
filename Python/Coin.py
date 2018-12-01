from CoinBlock import *
from Sprite import *

class Coin(Sprite):
    def __init__(self, model, x, y, w, h):  
        super(Coin, self).__init__(x,y,w,h)
        self.w = 30
        self.h = 30
        self.coinImage = pygame.image.load("images/coin.png")
        self.model = model
        isCoin = True


    def update(self):
        #gravity
        self.vertVel += 3.5
        self.y += self.vertVel


    def draw(self, screen):
        screen.blit(self.coinImage, (self.x - self.model.screenPos, self.y))
