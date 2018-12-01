import pygame
import time
import Model

from Model import *
from pygame.locals import *
from time import sleep

class Controller():
	def __init__(self, model):
		self.model = model
		self.keep_going = True

	def update(self):
		#telling game when to quit
		for event in pygame.event.get():
			if event.type == QUIT:
				self.keep_going = False
			elif event.type == KEYDOWN:
				if event.key == K_ESCAPE:
					self.keep_going = False
			elif event.type == pygame.MOUSEBUTTONUP:
				self.model.set_dest(pygame.mouse.get_pos())

		#user input for controlling mario
		keys = pygame.key.get_pressed()
		if keys[K_LEFT]:
			self.model.screenPos -= 10
			self.model.mario.animateMario("left")
		if keys[K_RIGHT]:
			self.model.screenPos += 10
			self.model.mario.animateMario("right")
		if keys[K_UP]:
			self.model.mario.y -= 10
		if keys[K_DOWN]:
			self.model.mario.y += 5
		if keys[K_SPACE] and self.model.mario.lastTouchCounter < 10:
			self.model.mario.vertVel = -20