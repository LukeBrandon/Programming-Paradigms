import json

from Mario import *
from Brick import *
from Coin import *
from CoinBlock import *
from json import *

class Model():

	def __init__(self):
		self.dest_x = 0
		self.dest_y = 0
		self.mario = None
		self.sprites = []
		self.screenPos = 0

		# self.brick = Brick(self, 300, 400, 300, 100)
		# self.coinBlock = CoinBlock(self, 300, 225, 50, 50)
		# self.sprites.insert(len(self.sprites), self.mario)
		# self.sprites.insert(len(self.sprites), self.brick)
		# self.sprites.insert(len(self.sprites), self.coinBlock)

		self.unmarshall()


	def update(self):
		self.screenPos = self.mario.x - 150

		#update all sprites here
		for x in self.sprites:
			x.update()

	def set_dest(self, pos):
		self.dest_x = pos[0]
		self.dest_y = pos[1]

	def unmarshall(self):
		print('unmarshalling')

		with open('map.json') as map_file:
			data = json.load(map_file)

		for sprite in data["sprites"]:
			if sprite['type'] == "brick":
				brick = Brick(self, sprite['x'], sprite['y'], sprite['w'], sprite['h'])
				self.sprites.insert(len(self.sprites), brick)
			elif sprite['type'] == "mario":
				self.mario = Mario(self)
				self.sprites.insert(len(self.sprites), self.mario)
			elif sprite['type'] == "coinBlock":
				coinBlock = CoinBlock(self, sprite['x'], sprite['y'], sprite['w'], sprite['h'])
				self.sprites.insert(len(self.sprites), coinBlock)
