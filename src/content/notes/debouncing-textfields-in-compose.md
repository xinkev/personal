---
title: "Debouncing TextFields in Compose"
publishedAt: 2023-12-28
description: "Debouncing user input in Android's Compose framework is essential for creating responsive and resource-efficient applications. This note demonstrates two approaches..."
slug: "debouncing-textfields-compose"
isPublish: true
--- 

## Efficient Input Handling in Compose

Debouncing user input in Android's Compose framework is essential for creating responsive and resource-efficient applications. This note demonstrates two approaches to implement debouncing for TextFields using Kotlin.

### ViewModel Approach
```kotlin
class DebounceViewModel : ViewModel() {
    val userInput = MutableStateFlow("")
    val debouncedInput = userInput.debounce(2500)
        .distinctUntilChanged()
        .flatMapLatest { input ->
            processInput(input)
        }

    private fun processInput(input: String): String {
        // Implementation goes here...
    }
}
```
This method involves a ViewModel (`VM`) that debounces and processes the input text. Here, `debounce(2000)` ensures a 2-second delay between user inputs before processing, reducing unnecessary database queries or operations. `distinctUntilChanged` prevents repeated processing of the same input, while `flatMapLatest` ensures only the latest input is considered.

### Composable Function Approach
```kotlin
@Composable
fun DebouncingTextField(onInputChanged: (String) -> Unit) {
    var textState by remember { mutableStateOf(TextFieldValue("")) }

    TextField(
        value = textState,
        onValueChange = { textState = it },
        label = { Text("Enter text") }
    )

    LaunchedEffect(key1 = textState) {
        if (textState.text.isNotEmpty()) {
            delay(2500)
            onInputChanged(textState.text)
        }
    }
}
```
This Composable function that utilizes `LaunchedEffect` with a 2-second delay (`delay(2000L)`) to debounce the input. The function reacts only to non-empty inputs and invokes `onInputChanged` after the specified delay, ensuring the application's responsiveness and efficiency in handling user inputs.

Both methods present practical and adaptable solutions for input debouncing in Compose. Depending on your application's requirements and structure, you may choose the one that best suits your needs.