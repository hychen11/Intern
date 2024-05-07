# CMake

CMakeLists.txt

假设所有测试文件都在test文件夹下并且命名为 *_test.cpp，可以在test文件夹下

```cmake
file(GLOB_RECURSE TEST_CPPS "${PROJECT_SOURCE_DIR}/tests/*test.cpp")
```

用于递归地搜索所有匹配的文件，并将它们的列表存储在变量`TEST_CPPS`中

```cmake
foreach (test_source ${TEST_CPPS})
    ...
endforeach ()
```

这个循环遍历所有找到的测试文件。对于每个文件，它执行以下操作：

- 获取文件名，去除`.cpp`后缀，创建一个易读的测试名称（`mySTL_test_name`）。
- 使用`add_executable`为每个测试文件创建一个可执行文件。
- 使用`target_link_libraries`将Google Test主库链接到每个测试可执行文件。
- 调用`gtest_discover_tests`来发现和注册测试，设置额外的参数和属性，包括输出格式（XML），是否捕获异常，测试发现超时和测试超时。
- 设置每个测试目标的属性，确保测试的可执行文件被放置在预期的目录，并指定运行测试的命令。

然后只需要在根路径下的`CMakeLists`中包含这个模块即可:

```cmake
add_subdirectory(tests)
```

之后自己新建的单元测试就可以被自动发现了

```cmake
cmake_minimum_required(VERSION 3.10)

include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/03597a01ee50ed33e9dfd640b249b4be3799d395.zip
)

# For Windows: Prevent overriding the parent project's compiler/linker settings
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

include(GoogleTest)

enable_testing()

file(GLOB_RECURSE TEST_CPPS "${PROJECT_SOURCE_DIR}/tests/*test.cpp")

foreach (test_source ${TEST_CPPS})
    # Create a human readable name.
    get_filename_component(test_filename ${test_source} NAME)
    string(REPLACE ".cpp" "" mySTL_test_name ${test_filename})

    # Add the test target separately and as part of "make check-tests".
    add_executable(${mySTL_test_name}  ${test_source})
    target_link_libraries(${mySTL_test_name} GTest::gtest_main)


    gtest_discover_tests(${mySTL_test_name}
            EXTRA_ARGS
            --gtest_color=auto
            --gtest_output=xml:${CMAKE_BINARY_DIR}/test/${mySTL_test_name}.xml
            --gtest_catch_exceptions=0
            DISCOVERY_TIMEOUT 120
            PROPERTIES
            TIMEOUT 120
            )

    # Set test target properties and dependencies.
    set_target_properties(${mySTL_test_name}
            PROPERTIES
            RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/test"
            COMMAND ${mySTL_test_name}
            )
endforeach ()
```

第一目录下的CMakeList.txt

```cmake
cmake_minimum_required(VERSION 3.16)

project(ProjectName)  

set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -D_GLIBCXX_DEBUG")

# GoogleTest requires at least C++14
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)


include_directories(include)

add_subdirectory(tests)

add_executable(a main.cpp) #source file is main.cpp
```

```shell
mkdir build&&cd build
cmake ..
make -j
./a
```

# Makefile

> DRW Codility 2023.9.22

Your task is to create a Makefile which is able to build an executable based on multiple source files. The details are listed below:

- The code of your project consists of cpp files only. All of them are in the ./src directory.
- Set up the proper compilation and linking flags globally: Your team has decided to use the root-config utility, which is used to configure and determine compiler and linker flags. So all you need to do is to use the flags that are listed there:
  - root-config --cflags for the CPPFLAGS;
  - root-config --Idflags for the LDFLAGS;
  - Build the executables with an extra flag ( -g ) for debugging info.
- Create the following build scenario:
  - Use only .cpp files that end with codility.cpp and ignore the rest;
  - For each codility.cpp file, create a codility.cpp.o file, and in the build command, use the CPPFLAGS that you defined before;
  - Build the final executable called program using all of the cpp.o files together; don't forget to use the LDFLAGS that you defined before.
- Everything created by this Makefile should be placed in the . /build directory.
  - Specifically: ﻿./build/program ﻿. /build/src/*codility.cpp.o
- Create a clean target which removes the . /build directory and all of its contents.

Here is a summary of how the Makefile should work: ﻿make should create a . /build directory,.

/build/program executable and related cpp.o files, according to the scenario above; ﻿No other build targets are necessary, but creating and referencing them will probably make it easier to finish the task.

```cpp
#compiler
CXX = g++

#FLAGS
CXXFLAGS=Wall -g -c -std=c++11
CPPFLAGS = $(shell root-config --cflags)
LDFLAGS = $(shell root-config --ldflags)
DEBUG_FLAG = -g

#source file
SOURCES= $(wildcard src/*codility.cpp)

OBJDIR = build/src

OBJECTS=$(patsubst src/%.cpp,$(OBJDIR)/%.cpp.o ,$(SOURCES))

EXECUTABLE=build/program

#build
all:$(OBJDIR) $(OBJECTS) $(EXECUTABLE)

$(EXECUTABLE):$(OBJECTS)
    $(CXX) $(LDFLAGS) $(OBJECTS) -o $@

$(OBJDIR)/%.cpp.o: src/%.cpp
    @mkdir -p $(@D)
    $(CXX) $(CPPFLAGS) $(DEBUG_FLAG) -c $< -o $@

$(OBJDIR):
    @mkdir -p $(OBJDIR)

clean:
    rm -rf build
```

**`@mkdir -p $(@D)`**: This line creates the directory structure necessary to place the object files. **`@mkdir -p`** is used to create the directories specified in the target path. **`$(@D)`** is an automatic variable that represents the directory part of the target file (in this case, **`$(OBJDIR)/file.cpp.o`**). It ensures that the directory structure exists before attempting to create the object file.

## 通配符%, $, $@, $<, $^, $*

```makefile
%.o: %.c
    gcc -c $< -o $@
```

```makefile
target: a.cpp b.cpp
	g++ -g $@ -o $^
# $@ is target
# $^ is all depend file, $< is first depend file
```

`%.o` 匹配所有以 `.o` 结尾的目标文件，`%.c` 匹配相应的源文件。

- **`$<`**：表示规则中的第一个依赖文件（也就是源文件）。
- **`$^`**：表示规则中的所有依赖文件的列表。
- **`$@`**：表示规则中的目标文件的名称，包括文件扩展名
- **`$\*`**：表示规则中的目标文件的基本名称，不包括文件扩展名

```makefile
_%: %.o $(ULIB)
    $(LD) $(LDFLAGS) -T $U/user.ld -o $@ $^
    $(OBJDUMP) -S $@ > $*.asm
    $(OBJDUMP) -t $@ | sed '1,/SYMBOL TABLE/d; s/ .* / /; /^$$/d' > $*.sym
```

### .PHONY

```cpp
.PHONY: clean
clean:
	rm -rf *.cpp a
```

**`.PHONY`** declaration tells Make that the **`clean`** target is a phony target, and it does not represent an actual file. When you run **`make clean`**, Make will always execute the **`rm -f \*.o`** command, even if there are no **`.o`** files in the directory.

Using **`.PHONY`** is a common practice for targets like **`clean`**, **`all`**, and other utility targets in Makefiles to ensure that the associated actions are performed reliably without relying on the existence of files with the same names.

## **6.S081的Makefile**

```
make qemu
qemu: $K/kernel fs.img
    $(QEMU) $(QEMUOPTS)

QEMU = qemu-system-riscv64

QEMUOPTS = -machine virt -bios none -kernel $K/kernel -m 128M -smp $(CPUS) -nographic
QEMUOPTS += -global virtio-mmio.force-legacy=false
QEMUOPTS += -drive file=fs.img,if=none,format=raw,id=x0
QEMUOPTS += -device virtio-blk-device,drive=x0,bus=virtio-mmio-bus.0

ifeq ($(LAB),net)
QEMUOPTS += -netdev user,id=net0,hostfwd=udp::$(FWDPORT)-:2000 -object filter-dump,id=net0,netdev=net0,file=packets.pcap
QEMUOPTS += -device e1000,netdev=net0,bus=pcie.0
endif
```

qemu依赖于K/kernel 和fs.img，$K是Makefile中的变量，说明是位于kernel文件夹下的kernel文件，kernel是操作系统内核，负责生成内核的可执行文件，fs.img负责生成文件系统的镜像，相当与模拟存放用户程序的硬盘 $(QEMU) $(QEMUOPTS)是两个变量，QEMU是模拟riscv的cpu

```makefile
$K/kernel: $(OBJS) $(OBJS_KCSAN) $K/kernel.ld $U/initcode
    $(LD) $(LDFLAGS) -T $K/kernel.ld -o $K/kernel $(OBJS) $(OBJS_KCSAN)
    $(OBJDUMP) -S $K/kernel > $K/kernel.asm
    $(OBJDUMP) -t $K/kernel | sed '1,/SYMBOL TABLE/d; s/ .* / /; /^$$/d' > $K/kernel.sym

$(OBJS): EXTRAFLAG := $(KCSANFLAG)
```

这里`$K/kernel.ld`把那一堆 OBJS和OBJS_KCSAN 链接成可执行的kernel，还依赖于user下的第一个程序，`$U/initcode`

### **链接器脚本: `$K/kernel.ld`**

随后我们查看`$K/kernel.ld` ，也就是位于kernel文件夹下的kernel.ld文件

```makefile
OUTPUT_ARCH( "riscv" )
ENTRY( _entry )

SECTIONS
{
  /*
   * ensure that entry.S / _entry is at 0x80000000,
   * where qemu's -kernel jumps.
   */
  . = 0x80000000;  //把入口地址设为_entry 0x80000000

  .text : {
    *(.text .text.*) //把可执行文件中的.o文件中的text
    . = ALIGN(0x1000);//做一个yield align对齐
    _trampoline = .; //记录当前位置
    *(trampsec)      //trampsec中断相关的代码，不超过一个页表大小
    . = ALIGN(0x1000);
    ASSERT(. - _trampoline == 0x1000, "error: trampoline larger than one page");              //不能超过0x1000,不超过一个页的大小
    PROVIDE(etext = .);//
  }

  .rodata : {
    . = ALIGN(16);
    *(.srodata .srodata.*) /* do not need to distinguish this from .rodata */
    . = ALIGN(16);
    *(.rodata .rodata.*)
  }

  .data : {
    . = ALIGN(16);
    *(.sdata .sdata.*) /* do not need to distinguish this from .data */
    . = ALIGN(16);
    *(.data .data.*)
  }

  .bss : {
    . = ALIGN(16);
    *(.sbss .sbss.*) /* do not need to distinguish this from .bss */
    . = ALIGN(16);
    *(.bss .bss.*)
  }

  PROVIDE(end = .);
}
```

text放程序，rodata放只读数据，data可读可写数据，bss全局变量，初始化为0的，整体如下如图所示

### **用户空间初始化程序: `$U/initcode`**

首先initcode的依赖关系，从makefile中可以看出

```makefile
$U/initcode: $U/initcode.S
    $(CC) $(CFLAGS) -march=rv64g -nostdinc -I. -Ikernel -c $U/initcode.S -o $U/initcode.o
    $(LD) $(LDFLAGS) -N -e start -Ttext 0 -o $U/initcode.out $U/initcode.o
    $(OBJCOPY) -S -O binary $U/initcode.out $U/initcode
    $(OBJDUMP) -S $U/initcode.o > $U/initcode.asm
$U/initcode:`依赖于`$U/initcode.S
# Initial process that execs /init.
# This code runs in user space.

#include "syscall.h"

# exec(init, argv)
.globl start
start:
        la a0, init
        la a1, argv
        li a7, SYS_exec
        ecall

# for(;;) exit();
exit:
        li a7, SYS_exit
        ecall
        jal exit

# char init[] = "/init\\0";
init:
  .string "/init\\0"

# char *argv[] = { init, 0 };
.p2align 2
argv:
  .long init
  .long 0
```

### **Kernel编译流程**

1. 编译`./Kernel`目录下的`.c`和`.s`源代码，编译的到`.o`目标文件
2. 按照`kernel.ld`脚本内的指令将这堆`.o`文件链接起来，的到最终的可执行文件`kernel`
3. 按照`kernel.ld`脚本，可执行文件入口被指定为`_entry`，该符号定义在`./kernel/entry.s`文件中

## **文件系统镜像`fs.img`的生成**

```makefile
UPROGS=\\
    $U/_cat\\
    $U/_echo\\
    $U/_forktest\\
    $U/_grep\\
    $U/_init\\
    $U/_kill\\
    $U/_ln\\
    $U/_ls\\
    $U/_mkdir\\
    $U/_rm\\
    $U/_sh\\
    $U/_stressfs\\
    $U/_usertests\\
    $U/_grind\\
    $U/_wc\\
    $U/_zombie\\

fs.img: mkfs/mkfs README $(UEXTRA) $(UPROGS)
    mkfs/mkfs fs.img README $(UEXTRA) $(UPROGS)
```

### **用户程序的编译**

对于`UPROGS`变量，其中每个用户程序都以`_`开始，对应的Makefile描述如下:

这里的`_%`是通配符，%匹配任何长度的任何字符串，通常，`%` 用于定义规则的模式目标和依赖关系。例如，你可以使用 `%.o` 来匹配所有以 `.o` 结尾的目标文件。

- `` 通配符通常在命令行中或 shell 中使用，用于匹配文件名中的字符，表示零个或多个任意字符。
- 例如，你可以使用 `.c` 来匹配所有以 `.c` 结尾的文件名。
- `` 在 Makefile 规则中不会像 `%` 那样用作通配符。

```makefile
UPROGS=\\
    $U/_cat\\
    $U/_echo\\
    $U/_forktest\\
    $U/_grep\\
    $U/_init\\
    $U/_kill\\
    $U/_ln\\
    $U/_ls\\
    $U/_mkdir\\
    $U/_rm\\
    $U/_sh\\
    $U/_stressfs\\
    $U/_usertests\\
    $U/_grind\\
    $U/_wc\\
    $U/_zombie\\

ULIB = $U/ulib.o $U/usys.o $U/printf.o $U/umalloc.o

_%: %.o $(ULIB)
    $(LD) $(LDFLAGS) -T $U/user.ld -o $@ $^
    $(OBJDUMP) -S $@ > $*.asm
    $(OBJDUMP) -t $@ | sed '1,/SYMBOL TABLE/d; s/ .* / /; /^$$/d' > $*.sym

$U/usys.S : $U/usys.pl
    perl $U/usys.pl > $U/usys.S

$U/usys.o : $U/usys.S
    $(CC) $(CFLAGS) -c -o $U/usys.o $U/usys.S
$U/usys.o
    $(OBJDUMP) -S $U/_forktest > $U/forktest.asm
```

### **`mkfs`程序**

```makefile
mkfs/mkfs: mkfs/mkfs.c $K/fs.h $K/param.h
    gcc $(XCFLAGS) -Werror -Wall -I. -o mkfs/mkfs mkfs/mkfs.c

fs.img: mkfs/mkfs README $(UEXTRA) $(UPROGS)
    mkfs/mkfs fs.img README $(UEXTRA) $(UPROGS)
```

`README $(UEXTRA) $(UPROGS)`都写入fs.img中

## **Xv6启动**

Xv6内核基于riscv体系结构，实验中用了qemu这个虚拟化工具，Xv6运行在qemu创建的虚拟机中，给qemu设定的选项中比较关键的是`-kernel $K/kernel`和`-drive file=fs.img`，分别指定了要运行的内核可执行文件和文件系统的镜像

```makefile
QEMU = qemu-system-riscv64

QEMUOPTS = -machine virt -bios none -kernel $K/kernel -m 128M -smp $(CPUS) -nographic
QEMUOPTS += -global virtio-mmio.force-legacy=false
QEMUOPTS += -drive file=fs.img,if=none,format=raw,id=x0
QEMUOPTS += -device virtio-blk-device,drive=x0,bus=virtio-mmio-bus.0

qemu: $K/kernel fs.img
    $(QEMU) $(QEMUOPTS)
```

### **Qemu Makefile**

https://github.com/mit-pdos/xv6-public/blob/eeb7b415dbcb12cc362d0783e41c3d1f44066b17/Makefile#L1

# GDB

compilor process

gcc → c, g++→c++

.c → .i→ .s→ .o→ link→ executable file

预处理，编译，汇编，链接

```shell
gcc -o
gcc -c
gcc -s
objdump -S 1.o
```

