import pygame
import random

pygame.init()
screen = pygame.display.set_mode((400, 600))
clock = pygame.time.Clock()

# Colores
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
RED = (255, 0, 0)

# Variables del juego
gravity = 0.25
bird_movement = 0
bird_rect = pygame.Rect(100, 300, 50, 50)
pipe_list = []
SPAWNPIPE = pygame.USEREVENT
pygame.time.set_timer(SPAWNPIPE, 1200)
pipe_heights = [400,500]

def draw_floor():
    screen.blit(floor_surface,(floor_x_pos,-350))
    screen.blit(floor_surface,(floor_x_pos +576,-350))

def create_pipe():
    random_pipe_pos=random.choice(pipe_heights)
    bottom_pipe=pipe_surface.get_rect(midtop=(700,-random_pipe_pos))
    top_pipe=pipe_surface.get_rect(midbottom=(700,-random_pipe_pos-150))
    return bottom_pipe,top_pipe

def move_pipes(pipes):
    for pipe in pipes:
        pipe.centerx -=5
    return pipes

def draw_pipes(pipes):
    for pipe in pipes:
        if pipe.bottom>=600:
            screen.blit(pipe_surface,(pipe.x,-pipe.y+600))
        else:
            flip_pipe=pygame.transform.flip(pipe_surface,False,True)
            screen.blit(flip_pipe,(pipe.x,-pipe.y+600))

def check_collision(pipes):
    for pipe in pipes:
        if bird_rect.colliderect(pipe):
            return False

    if bird_rect.top <= -100 or bird_rect.bottom >= -350:
        return False

    return True

def rotate_bird(bird):
    new_bird=pygame.transform.rotozoom(bird,-bird_movement*3 ,1 )
    return new_bird

def bird_animation():
    new_bird=bird_frames[bird_index]

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
