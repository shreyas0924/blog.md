---
title: "Decorator Pattern Design"
date: "2025-08-17"
published: true
description: The Decorator Pattern is a structural design pattern that allows us to dynamically add new functionality to objects without modifying their existing code.
tags: ['system design', 'java']
---

## Introduction

The **Decorator Pattern** is a **structural design pattern** that allows us to dynamically add new functionality to objects **without modifying their existing code**.

Instead of creating multiple subclasses for every possible combination of features, we "wrap" objects inside other objects (decorators). Each decorator adds its own behavior while still delegating to the original object.

Think of it as **layering features step by step**—like stacking toppings on a pizza.

---

## Why Do We Need the Decorator Pattern?

* **Avoids class explosion**: Instead of making a class for every possible combination (`PizzaWithCheese`, `PizzaWithCheeseAndMushroom`, etc.), we can just **wrap objects dynamically**.
    
* **Open-Closed Principle**: Classes are open for extension but closed for modification. We can add features **without changing the existing class**.
    
* **Flexibility**: We can mix and match decorators in any order.
    
* **Reusability**: Each decorator is independent and can be reused across different objects.
    

---

## Real-World Example

Imagine a **pizza shop**:

* You start with a **Base Pizza** (like `Margherita` or `Farmhouse`).
    
* Customers can add toppings: **extra cheese, jalapenos, mushrooms, olives**, etc.
    
* Each topping **decorates** the base pizza, increasing cost step by step.
    

This is exactly what the **Decorator Pattern** achieves.

---

## UML Representation

```plaintext
          ┌─────────────────┐
          │    BasePizza    │  <-- Abstract Component
          │  + cost(): int  │
          └─────────────────┘
                  ▲
                  │
    ┌─────────────┼─────────────┐
    │                           │
┌─────────────┐          ┌──────────────────┐
│ Farmhouse   │          │ ToppingDecorator │ <-- Abstract Decorator
│ + cost()    │          │ extends BasePizza│
└─────────────┘          └──────────────────┘
                              ▲
                              │
              ┌───────────────┼───────────────┐
              │                               │
      ┌──────────────┐                ┌──────────────┐
      │ ExtraCheese  │                │ ExtraMushroom│
      │ + cost()     │                │ + cost()     │
      └──────────────┘                └──────────────┘
```

---

## Java Implementation

### Base Component

```java
package DecoratorPattern;

public abstract class BasePizza {
    public abstract int cost();
}
```

### Concrete Components

```java
package DecoratorPattern;

public class Margherita extends BasePizza {
    @Override
    public int cost() {
        return 100;
    }
}

package DecoratorPattern;

public class Farmhouse extends BasePizza {
    @Override
    public int cost() {
        return 200;
    }
}
```

### Abstract Decorator

```java
package DecoratorPattern;

public abstract class ToppingDecorator extends BasePizza {
    // Empty for now, but ensures all toppings act as pizzas
}
```

### Concrete Decorators

```java
package DecoratorPattern;

public class ExtraCheese extends ToppingDecorator {
    BasePizza basePizza;

    public ExtraCheese(BasePizza pizza) {
        this.basePizza = pizza;
    }

    @Override
    public int cost() {
        return basePizza.cost() + 10;
    }
}

package DecoratorPattern;

public class ExtraMushroom extends ToppingDecorator {
    BasePizza basePizza;

    public ExtraMushroom(BasePizza pizza) {
        this.basePizza = pizza;
    }

    @Override
    public int cost() {
        return basePizza.cost() + 50;
    }
}
```

### Client Code

```java
package DecoratorPattern;

public class Main {
    public static void main(String[] args) {
        BasePizza epicPizza = new ExtraMushroom(new ExtraCheese(new Farmhouse()));
        System.out.println("Cost of epic pizza: " + epicPizza.cost());
    }
}
```

**Output:**

```plaintext
Cost of epic pizza: 260
```

---

## Key Takeaways

1. **Decorator pattern adds behavior at runtime**, unlike inheritance which is fixed at compile time.
    
2. **Each decorator is independent** and can wrap any object of the base type.
    
3. Helps when you need **many combinations of features** but don’t want **dozens of subclasses**.
    
4. It promotes **composition over inheritance**.
    
5. Order matters: wrapping with `ExtraCheese` first vs `ExtraMushroom` first can sometimes affect behavior.
    

---

## Other Use Cases

* **Coffee Shop** (base coffee + milk + sugar + caramel + whipped cream).
    
* **File I/O Streams in Java** (`BufferedReader`, `InputStreamReader`, etc.).
    
* **UI Frameworks** (adding borders, scrollbars, shadows to windows).

