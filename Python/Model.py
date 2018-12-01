import json

from Mario import *
from Brick import *
from json import *

class Model():

	def __init__(self):
		self.dest_x = 0
		self.dest_y = 0
		self.mario = Mario(self)
		self.sprites = []
		self.screenPos = 0
		self.brick = Brick(self, 300, 400, 300, 100)
		#self.sprites.insert(self.mario)
		#self.unmarshall()


	def update(self):
		self.mario.update(self)

	def set_dest(self, pos):
		self.dest_x = pos[0]
		self.dest_y = pos[1]

	def unmarshall(self):
		print('marshalling map.json')
		with open('map.json') as map_file:
			data = json.load(map_file)
		#print(data)

		for i in data["sprites"]:
			print (data["sprites"].get(i))
			#self.sprites.insert(data["sprites"].get(i))


