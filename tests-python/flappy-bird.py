import pygame
import sys
import random

# Initialize Pygame
pygame.init()

# Screen dimensions
WIDTH = 288
HEIGHT = 512

# Colors
WHITE = (255, 255, 255)

# Game variables
gravity = 0.25
bird_movement = 0
game_active = False
game_started = False
score = 0

# Create screen
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Flappy Bird')

# Load images
bg_surface = pygame.image.load('assets/background-day.png').convert()
floor_surface = pygame.image.load('assets/base.png').convert()
bird_surface = pygame.image.load('assets/bluebird-midflap.png').convert_alpha()
pipe_surface = pygame.image.load('assets/pipe-green.png').convert_alpha()

# Set bird rectangle
bird_rect = bird_surface.get_rect(center=(50, HEIGHT//2))

# Set pipe list and timer
pipe_list = []
SPAWNPIPE = pygame.USEREVENT
pygame.time.set_timer(SPAWNPIPE, 1200)

# Load and set game font
game_font = pygame.font.Font(None, 40)

def create_pipe():
    pipe_height = random.randint(200, 350)
    bottom_pipe = pipe_surface.get_rect(midtop=(350, pipe_height))
    top_pipe = pipe_surface.get_rect(midbottom=(350, pipe_height - 150))
    return bottom_pipe, top_pipe

def move_pipes(pipes):
    for pipe in pipes:
        pipe.centerx -= 5
    return pipes

def draw_pipes(pipes):
    for pipe in pipes:
        if pipe.bottom >= HEIGHT:
            screen.blit(pipe_surface, pipe)
        else:
            flip_pipe = pygame.transform.flip(pipe_surface, False, True)
            screen.blit(flip_pipe, pipe)

def check_collision(pipes):
    global score
    for pipe in pipes:
        if bird_rect.colliderect(pipe):
            return False
        if pipe.centerx < bird_rect.centerx < pipe.centerx + 5:
            score += 1

    if bird_rect.top <= -100 or bird_rect.bottom >= 900:
        return False

    return True

def display_score():
    score_surface = game_font.render(str(score), True, WHITE)
    score_rect = score_surface.get_rect(center=(WIDTH // 2, 50))
    screen.blit(score_surface, score_rect)

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE:
                if not game_started:
                    game_started = True
                if game_active:
                    bird_movement = 0
                    bird_movement -= 7
                else:
                    game_active = True
                    pipe_list.clear()
                    bird_rect.center = (50, HEIGHT // 2)
                    bird_movement = -7
                    score = 0
        if event.type == SPAWNPIPE and game_started:
            pipe_list.extend(create_pipe())

    screen.blit(bg_surface, (0, 0))

    if game_active:
        # Bird
        bird_movement += gravity
        bird_rect.centery += bird_movement
        screen.blit(bird_surface, bird_rect)
        game_active = check_collision(pipe_list)

        # Pipes
        pipe_list = move_pipes(pipe_list)
        draw_pipes(pipe_list)

    # Floor
    screen.blit(floor_surface, (0, HEIGHT-100))

    display_score()
    pygame.display.update()
    pygame.time.Clock().tick(120)