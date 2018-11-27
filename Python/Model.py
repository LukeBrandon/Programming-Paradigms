class Model():
	def __init__(self):
		self.dest_x = 0
		self.dest_y = 0

	def update(self):
		if self.rect.left < self.dest_x:
			self.rect.left += 1
		if self.rect.left > self.dest_x:
			self.rect.left -= 1
		if self.rect.top < self.dest_y:
			self.rect.top += 1
		if self.rect.top > self.dest_y:
			self.rect.top -= 1

	def set_dest(self, pos):
		self.dest_x = pos[0]
		self.dest_y = pos[1]