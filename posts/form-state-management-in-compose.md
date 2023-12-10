---
title: Managing Form State in Compose
date: 2022-12-05
author: xinkev
tags: ["androiddev", "notifications", "form", "input", "compose"]
summary: At my previous job, we used to store input data inside `LiveData` objects in a `ViewModel`, by creating multiple `MutableLiveData`s, and multiple `LiveData` for encapsulation. Like so...
---
At my previous job, we used to store input data inside `LiveData` objects in a `ViewModel`, by creating multiple `MutableLiveData`s, and multiple `LiveData` for encapsulation. Like so:

```kotlin
private val _name = MutableLiveData<String>()
val name: LiveData<String> get() = _name
private val _email = MutableLiveData<String>()
val email: LiveData<String> get() = _email
private val _phone = MutableLiveData<String>()
val phone: LiveData<String> get() = _phone
```
And then, we would observe these fields inside an `Activity` or a `Fragment`. As you can see, this is a lot of codes, just to store three input values. Can you imagine what it would be like if you had more than ten inputs on the screen? What if you also want to have form validation and store error messages? 

I was never a fan of this solution, but it just works even though there are a lot of boilerplate codes. I have failed multiple times to create a more elegant solution. So, I continued to keep all my projects sticked to this style. That was until recently when I found a solution that I am satisfied with. It is also more elegant in my opinion. So, I decided to write it down. 

One thing to note is that this is only intended to work with Jetpack Compose.

The solution is inspired by the official Android documentation, ["Where to hoist state"](https://developer.android.com/jetpack/compose/state-hoisting). We will create a class to store(hoist?) the state of hour inputs. Like this:
```kotlin
class FormState() {
    var name by mutableStateOf("")
    var email by mutableStateOf("")
    var phone by mutableStateOf("")
}
```
And then, we can use the properties like this:
```kotlin
TextField(
    value = state.name,
    onValueChanged = { state.name = it}
)
```
Simple right? We will mark this class with `@Stable` annotation to promise to Compose compiler that the values inside the class are observable and changes will be notified(that's why we are using `State` inside the class).
```kotlin
@Stable
class FormState() {
    var name by mutableStateOf("")
    var email by mutableStateOf("")
    var phone by mutableStateOf("")
}
```
Wait, how will we use this class, and how will we handle configuration changes or process death? We will use `rememberSaveable` for that. But we will need a `Saver` object for that. Don't worry. It's easy to create one. But first, let's update our `FormState` class to accept default values.
```kotlin
@Stable
class FormState(name: String, email: String, phone: String) {
    var name by mutableStateOf(name)
    var email by mutableStateOf(phone)
    var phone by mutableStateOf(email)
}
```
Now, let's create a saver object for our `FormState` class.
```kotlin
val Saver = run {
    val nameKey = "name"
    val emailKey = "email"
    val phoneKey = "phone"
    mapSave(
        save = mapOf(
            nameKey to it.name, 
            emailKey to it.email, 
            phoneKey to it.phone,
        ),
        restore = mapOf(
            FormState(
                name = it[nameKey] as String,
                phone = it[phoneKey] as String,
                email = it[emailKey] as String,
            )
        )
    )
}
```
And then, we can have our form state remembered across configuration changes like this:
```kotlin
val state by rememberSaveable(saver = Saver) {
    FormState("", "", "")
}
TextField(
    value = state.name,
    onValueChanged = { state.name = it}
)
```
Sure, this is still a lot of code but a lot more elegant than the previous solution, in my own opinion. We can even add validation logic easily with this solution. For example, if we want to enable the save button only if all three inputs are not blank, we can just do this:
```kotlin
@Stable
class FormState(...){
    ...
    val buttonEnabled: Boolean get() = name.isNotBlank() && email.isNotBlank() && phone.isNotBlank()
}
```
And bind this to the button:
```kotlin
Button(
    enabled = state.buttonEnabled
)
```
It will automatically reflect the changes to the input changes.
