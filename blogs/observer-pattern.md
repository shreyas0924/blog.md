---
title: "Observer Pattern Design"
date: "2025-08-09"
published: true
description: The Observer pattern is a software design pattern where an object (the subject or publisher) maintains a list of its dependents (the observers or subscribers) and automatically notifies them of any state changes.
tags: ['system design', 'java']
---

The **Observer Pattern** is a behavioral design pattern that defines a one-to-many dependency between objects so that when one object (the *Subject* or *Observable*) changes state, all of its dependents (the *Observers*) are automatically notified and updated. The pattern promotes loose coupling: the subject and its observers interact through interfaces, allowing observers to be added, removed, or changed at runtime without modifying the subject's code.

---

## 1\. Concept Overview

* **One-to-Many Dependency**: One Subject/Observable can have multiple Observers subscribed to it.
    
* **Two Main Players**:
    
    * **Observable (Subject)**: Holds the state and sends notifications when it changes.
        
    * **Observer**: Receives updates and reacts to them.
        
* **Key Point**: Whenever the state of the Observable changes, all registered Observers are notified and given a chance to update themselves accordingly.
    

---

## 2\. Basic Structure

### Observable Interface

```java
public interface ObservableInterface {
    void add(ObserverInterface obj);
    void remove(ObserverInterface obj);
    void notifyObservers();
    void setData();
}
```

### Observer Interface

```java
public interface ObserverInterface {
    void update();
}
```

---

## 3\. Core Relationship

The **Observable** maintains a list of observers. When `setData()` is called and the internal state changes, it triggers `notifyObservers()` which calls `update()` on all observers.

**Basic Example**:

```java
public class Observable {

    List<ObserverInterface> objList = new ArrayList<>();

    public void add(ObserverInterface obj) {
        objList.add(obj);
    }

    public void remove(ObserverInterface obj) {
        objList.remove(obj);
    }

    public void notifyObservers() {
        for (ObserverInterface obj : objList) {
            obj.update();
        }
    }

    public void setData() {
        // Change some internal state
        notifyObservers();
    }
}

public class Observer {
    public void update() {
        // React to the update
    }
}
```

---

## 4\. Constructor Injection Approach

Instead of passing the Observable object as a parameter to the `update()` method, we can give the Observer a direct reference to the Observable via **constructor injection**.

This approach works well when:

* Multiple types of Observable concrete classes exist.
    
* Observers need direct access to the Observable's data (for example, calling `getData()` on the Observable).
    

---

## 5\. Example: Stock Alert System

Let's implement the Observer Pattern for a stock notification scenario.

### Observer Interface

```java
package ObserverPattern;

public interface ObserverInterface {
    void update();
}
```

### Observable Interface

```java
package ObserverPattern;

public interface StockObservable {
    void addObserver(ObserverInterface observer);
    void removeObserver(ObserverInterface observer);
    void notifyObservers();
    int getData();
    void setData(int data);
}
```

### Observable Implementation

```java
package ObserverPattern;

import java.util.ArrayList;

public class StockObservableImpl implements StockObservable {

    public ArrayList<ObserverInterface> observersList = new ArrayList<>();
    public int stockCount = 0;

    @Override
    public void addObserver(ObserverInterface observer) {
        observersList.add(observer);
    }

    @Override
    public void removeObserver(ObserverInterface observer) {
        observersList.remove(observer);
    }

    @Override
    public void notifyObservers() {
        for (ObserverInterface observer : observersList) {
            observer.update();
        }
    }

    @Override
    public int getData() {
        return stockCount;
    }

    @Override
    public void setData(int newStockCount) {
        if (newStockCount == 0) notifyObservers();
        this.stockCount += newStockCount;
    }
}
```

### Observer Implementations

#### Email Alerts

```java
package ObserverPattern;

public class EmailAlertObserverImpl implements ObserverInterface {

    String emailId;
    StockObservable observable;

    public EmailAlertObserverImpl(String emailId, StockObservable observable) {
        this.emailId = emailId;
        this.observable = observable;
    }

    @Override
    public void update() {
        sendEmail(emailId, "Stock updated");
    }

    private void sendEmail(String emailId, String message) {
        System.out.println("Mail sent to " + emailId + " with message: " + message);
    }
}
```

#### Phone Alerts

```java
package ObserverPattern;

public class PhoneAlertObserverImpl implements ObserverInterface {

    int mobileNumber;
    StockObservable observable;

    public PhoneAlertObserverImpl(int mobileNumber, StockObservable observable) {
        this.mobileNumber = mobileNumber;
        this.observable = observable;
    }

    @Override
    public void update() {
        sendSms(mobileNumber, "Stock updated SMS");
    }

    public void sendSms(int mobileNumber, String msg) {
        System.out.println(msg + " sent to " + mobileNumber);
    }
}
```

---

## 6\. How It Works

1. **Create Observable**:
    
    ```java
    StockObservable stockObservable = new StockObservableImpl();
    ```
    
2. **Create Observers**:
    
    ```java
    ObserverInterface emailObserver = new EmailAlertObserverImpl("test@example.com", stockObservable);
    ObserverInterface phoneObserver = new PhoneAlertObserverImpl(987654321, stockObservable);
    ```
    
3. **Register Observers**:
    
    ```java
    stockObservable.addObserver(emailObserver);
    stockObservable.addObserver(phoneObserver);
    ```
    
4. **Change State**:
    
    ```java
    stockObservable.setData(0); // This triggers notifications
    ```
    

When the stock count is updated to 0, all registered observers are notified automatically.

---

## 7\. Advantages of Observer Pattern

* Promotes **loose coupling** between objects.
    
* Makes it easy to add or remove observers without changing the core logic.
    
* Suitable for event-driven architectures.
    

---

## 8\. When to Use

* When changes in one object require updates in other dependent objects.
    
* When an object should be able to notify other objects without knowing their concrete classes.
    
* Ideal for UI frameworks, event listeners, or data monitoring systems.
    

---

The **Observer Pattern** is a simple, well-tested way to implement a one-to-many relationship in your code. It is widely used in GUI toolkits, data models, and systems that require state-change propagation to multiple components.