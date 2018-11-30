import pygame
import time
import Model

from Model import *
from pygame.locals import*
from time import sleep

class View():
	keep_going = True

	def __init__(self, model):
		screen_size = (800,600)
		self.screen = pygame.display.set_mode(screen_size, 32)
		self.turtle_image = pygame.image.load("images/turtle.png")
		self.model = model
		self.model.rect = self.turtle_image.get_rect()


	def update(self):    
		self.screen.fill([0,200,100])
		self.model.mario.draw(self.screen)
		pygame.display.flip()
