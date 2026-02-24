---
title: "Spring Framework"
date: "2025-01-04"
published: true
description: Spring Framework is a powerful and widely used Java framework for building enterprise applications. It provides comprehensive infrastructure support for developing Java applications, making it easier to manage dependencies, configure components, and build robust, scalable applications. 
tags: ['backend', 'java']
---

1. **Dependency Injection**
    
    * Dependency Injection (DI) is a core principle in Spring Framework that helps to achieve loose coupling between components.
        
    * Instead of objects creating their own dependencies, they are provided with them by an external entity, typically the Spring IoC container.
        
2. **Types of DI in Spring:**
    
    * **Constructor Injection:** Dependencies are passed as arguments to the constructor.
        
    * **Setter Injection:** Dependencies are set via setter methods.
        
    * **Field Injection:** Dependencies are injected directly into private fields using annotations like `@Autowired`.
        
3. **Constructor Injection Example**
    
    ```java
    @Component
    public class UserService {
    
        private final UserRepository userRepository;
        @Autowired // Autowire constructor
        public UserService(UserRepository userRepository) {
            this.userRepository = userRepository;
        }
        // ... methods that use userRepository
    }
    ```
    
4. **Setter Injection Example**
    
    ```java
    @Component
    public class UserService {
    
        private UserRepository userRepository;
    
        @Autowired 
        public void setUserRepository(UserRepository userRepository) {
            this.userRepository = userRepository;
        }
    
        // ... methods that use userRepository
    }
    ```
    
5. **Field Injection Example**
    
    ```java
    @Component
    public class UserService {
        @Autowired 
        private UserRepository userRepository;
        // ... methods that use userRepository
    }
    ```
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1734676715531/166d9f10-9220-4786-896f-73238069c638.png )

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1734676798470/24e8241c-2ab3-4875-91fb-12ebc9dbe935.png )

## Spring Modules

Spring Core - Core, Beans, Context, spEL

AOP - Aspect - Instrumentation - Messaging

Data Access/ Integration - ORM, OXM, JMS, JDBC

Web Module - Web, WS, Servlet, Portlet

## Spring IOC Container

The Spring IoC container is **a framework that automatically injects dependencies into objects, and manages their lifecycle.**

It's based on the Inversion of Control (IoC) design principle, which moves the control of object creation, configuration, and management from the application code to the framework.

![Understanding IoC Container in Spring Boot with a Real-Time ...](https://miro.medium.com/v2/resize:fit:892/1*QIpqJYXTEMpQsE_Lu1NKYQ.png )

## Autowiring in spring

* Its a feature in spring framework in which the spring container injects the dependencies automatically.
    
* Autowiring cannot be used to inject primitive and string values. It works with reference only.
    
* Previously, we linked two classes manually in the config.xml file using &lt;ref bean=””&gt;. With autowiring, we can allow the Spring container to handle this process automatically.
    
* there are two ways to do autowiring - using XML and @Autowired annotation.
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1735196035794/1ae50f00-0c38-4c26-95d4-77fc0e9e9a57.png )