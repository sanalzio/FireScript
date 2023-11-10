# 📙 FireScript Documentation

- [📙 FireScript Documentation](#-firescript-documentation)
  - [💬 Description](#-description)
  - [✔ Installation](#-installation)
  - [🛠 Usage](#-usage)
  - [Write FireScript in html code](#write-firescript-in-html-code)
  - [Write FireScript in external file and import](#write-firescript-in-external-file-and-import)
  - [🔑 Keys](#-keys)
    - [comment lines](#comment-lines)
    - [define](#define)
    - [definejs](#definejs)
    - [randint](#randint)
    - [getinp](#getinp)
    - [gdefine, grandint, ggetinp](#gdefine-grandint-ggetinp)
    - [math](#math)
    - [if](#if)
    - [else](#else)
    - [lower](#lower)
    - [upper](#upper)
    - [js eval](#js-eval)
    - [date](#date)
    - [point](#point)
    - [break](#break)
    - [import](#import)
  - [Functions](#functions)
    - [log](#log)
    - [write](#write)
    - [writeln](#writeln)
    - [jseval](#jseval)
    - [goto](#goto)
    - [delay](#delay)
    - [alert](#alert)
    - [group](#group)
    - [groupval](#groupval)
    - [groupcollapsed](#groupcollapsed)
    - [groupend](#groupend)
    - [style](#style)
  - [Blocks](#blocks)
    - [""" Block](#-block)
    - [''' Block](#-block-1)
    - [$$$ Block](#-block-2)
    - [\`\`\` Block](#-block-3)

## 💬 Description
FireScript is a lightweight javascript library for web development.

**This project idea is developed based on an idea proposed in the Fireship Discord server.**

## ✔ Installation
- Paste this tag into the head tag in your html code:
    ```html
    <style>firescript{display: none;}</style>
    ```
- Paste this tag into the body tag in your html code:
    ```html
    <script src="https://cdn.jsdelivr.net/gh/sanalzio/FireScript@master/index.js"></script>
    ```


## 🛠 Usage
- Create a new `<firescript></firescript>` tag.
- And write code in firescript tag content.

## Write FireScript in html code
```html
<firescript>
    log Hi, Mom!
</firescript>
```

## Write FireScript in external file and import
**index.fs file content:**
```
log Hi, Mom!
```

```html
<firescript src="index.fs"></firescript>
```

## 🔑 Keys

### comment lines
```
// This is a comment line.
```

### define
Variable definitions.
```
define variable_name Hi, Mom!
log ${variable_name}
```
output:
> Hi, Mom!

### definejs
JavaScript variable definitions.
```
definejs variable_name "Hi, Mom!"
log ${variable_name}
```
output:
> Hi, Mom!

### randint
Defines a random number variable.
```
randint random_integer 1 10
log ${random_integer}
```
output:
> 5

### getinp
Defines an input variable.
```
getinp user_input
getinp user_input2 Who?
log ${user_input}
```
output:
> Hi, Mom!

### gdefine, grandint, ggetinp
Similar to define, randint, and getinp but globally defines variables using these keywords.

### math
Allows mathematical operations.
```
define variable 123
echo $[${variable}+5]
```
output:
> 128
**! Warning:** Mathematical operations should be without spaces.

### if
if Executes the following operations if the condition is met.
```
getinp input
if "$lower{input}"=="mom"
    log Hi, Mom!
end
```
**! Warning:** If using a string in a condition, enclose it in double quotes ("").
**! Warning:** Each condition statement must be followed by "end" or "###" to avoid including other operations in the condition.

### else
Executes the following operations if the condition is not met.
```
getinp input
if "$lower{input}"=="mom"
    log Hi, Mom!
end
else
    log Hi, Dad!
end
```
**! Warning:** If using a string in a condition, enclose it in double quotes ("").

### lower
Converts uppercase letters to lowercase.
```
getinp input
if "$lower{input}"=="mom"
    log Hi, Mom!
end
```
output:
> Hi, Mom!
**! Warning:** Takes the value of the variable corresponding to the entered value, so you cannot enter a string.

### upper
Converts lowercase letters to uppercase.
```
getinp input
if "$upper{input}"=="MOM"
    log Hi, Mom!
end
```
output:
> Hi, Mom!
**! Warning:** Takes the value of the variable corresponding to the entered value, so you cannot enter a string.

### js eval
Allows running JavaScript code or obtaining a variable.
```
getinp input
if "$js{${input}.toLowerCase()}"=="mom"
    log Hi, Mom!
end
```
output:
> Hi, Mom!
**! Warning:** Should not contain spaces within the entered value.

### date
Provides information about the date.
```
log $date{}
log $date{day}
```
output:
> Thu Nov 09 2023 21:56:25 GMT+0300 (GMT+03:00)
> 4

### point
Allows placing a specific point in the code.
```
define i 0
point linepoint
log ${i}
define i $[${i}+1]
goto linepoint
```
output:
> 0
> 1
> 2
> 3
> ...


### break
Ends the point loop.
```
define i 0
point linepoint
if ${i}==3
    log ended.
    break
end
log ${i}
define i $[${i}+1]
goto linepoint
```
output:
> 0
> 1
> 2
> ended.

### import
Imports an external module.
```
import module
```
Imports the `module.fs` file.
**! Warning:** Importing may not work in some browsers due to security restrictions. You can try using localhost.

## Functions

### log
Writes to the console.
```
log Hi, Mom.
```
output:
> Hi, Mom.

### write
Writes to the HTML output.
```
write Hi, Mom.
```

### writeln
Writes to the HTML output as a line.
```
writeln Hi, Mom.
```

### jseval
Runs JavaScript code.
```
jseval ${input}
```

### goto
Goes to the specified point address.
```
goto linepoint
```

### delay
Waits for the specified milliseconds.
```
delay 1000
```

### alert
Displays an alert.
```
alert Hi, Mom.
```

### group
Creates a console output group.
```
group Hi
groupval mom Mom
groupval dad Dad
groupend
```

### groupval
Adds data to a console output group.
```
groupval group_variable_name Hi, Mom.
```

### groupcollapsed
Creates another group within a console output group.
```
group Hi
groupval mom Mom
groupval dad Dad
groupcollapsed Brothers
groupval jake Jake
groupval peter Peter
groupend
```

### groupend
Ends a console output group.
```
groupend
```

### style
Changes the style of the firescript tag it is within.
```
style color #E16D75
```

## Blocks

### """ Block
Runs JavaScript code.
```
"""
console.log("Hi, Mom!")
"""
```

### ''' Block
Runs JavaScript code when a specified condition occurs.
```
''' mouseover
console.log("Hi, Mom!")
'''
''' mouseout
console.log("Bye, Mom!")
'''
```

### $$$ Block
Runs FireScript code for a specified condition.
```
$$$ mouseover
log Hi, Mom!
style color #E16D75
$$$
$$$ mouseout
log Bye, Mom!
style color #f2f2f2
$$$
```

### ``` Block
Changes the style of the firescript tag it is within.
```
```.
color: #E16D75;
```.
```
