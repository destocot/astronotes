---
title: "Classes"
sidebar:
  order: 7
---

## Basic Class

```py
class TestClass:
    test_var = (1, 2, 3)
    another_var = "something"

    def test_func(self):
        print("function in a class")
        print(self.test_var)
        self.another_func("123")

    def another_func(self, test_param):
        print(test_param)

# Create an instance
test = TestClass()
print(test.test_var)
test.another_var = "new value"
print(test.another_var)

test2 = TestClass()
print(test2.another_var)
test2.test_func()
test2.another_func("test")
```

## Class Concepts

- **Attributes**: Variables in a class.
- **Methods**: Functions in a class.
- **Self**: Refers to any instance of the class and must be the first parameter for all methods.
- **Dunder Methods**: Special methods of a class (e.g., `__init__`, `__len__`).

## Mage Class

```py
class Mage:
    def __init__(self, health, mana):
        self.health = health
        self.mana = mana
        print("the mage class was created")
        print(self.health)

    def attack(self, target):
        target.health -= 10

class Monster:
    health = 40

mage = Mage(100, 200)
monster = Monster()

print(monster.health)
mage.attack(monster)
print(monster.health)
```

## Inheritance

- Allows one class to get the methods and attributes of another class.
- A class can inherit from multiple classes.

```py
class Human:
    def __init__(self, health):
        self.health = health

    def attack(self):
        print("attack")

class Warrior(Human):
    def __init__(self, health, defense):
        super().__init__(health)
        self.defense = defense

class Barbarian(Human):
    def __init__(self, health, damage):
        super().__init__(health)
        self.damage = damage

warrior = Warrior(50, 5.5)
barbarian = Barbarian(100, 8.1)
warrior.attack()
barbarian.attack()
print(warrior.health)
```

## Exercise: Create a Monster Class

1. Create a `Monster` class where you can set the health and damage attributes on creation.
2. It should inherit from an `Entity` class to get an attack method (that prints 'attack' & the damage amount).
3. When the class is printed, it returns `a monster with {health} hp`.

```py
class Entity:
    def attack(self):
        print(f"attack with {self.damage} damage")

class Monster(Entity):
    def __init__(self, health, damage):
        self.health = health
        self.damage = damage

    def __repr__(self):
        return f"a monster with {self.health} hp"

monster = Monster(100, 25)
print(monster.health)
monster.attack()
print(monster)
```
