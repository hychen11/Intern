# Google Test

```c++
#include "gtest/gtest.h"

ASSERT_*  // terminate immediately!
ASSERT_TRUE,ASSERT_FALSE,ASSERT_EQ

EXPECT_*  // allow multiply test(dont terminate!)
EXPECT_TRUE,EXPECT_FALSE,EXPECT_EQ    
```

## Test Case

```c++
TEST(Test,InsertTEST){
	int ans=1;
	EXPECT_EQ(ans,1);
}
```

## Mock

can mock objects

```c++
#include <gtest/gtest.h>
#include <gmock/gmock.h>

class MyMockClass {
public:
    MOCK_METHOD(int, add, (int a, int b));
};

TEST(MyTest, ExampleTest) {
    MyMockClass mock;

    // Expect that the 'add' method will be called with arguments 3 and 4 at least once
    EXPECT_CALL(mock, add(3, 4))
        .Times(::testing::AtLeast(1))  // Specify that the method should be called at least once
        .WillRepeatedly(::testing::Return(7));  // Specify the action: return 7

    // Use the mock object in your code (multiple times in this case)
    int result1 = mock.add(3, 4);
    int result2 = mock.add(3, 4);
    int result3 = mock.add(3, 4);

    // Verify that the expectations are met
    ASSERT_EQ(result1, 7);
    ASSERT_EQ(result2, 7);
    ASSERT_EQ(result3, 7);
}
```

```c++
#include <gtest/gtest.h>
#include <gmock/gmock.h>

// Assume we have a class representing a user
class IUser {
public:
    virtual ~IUser() {}
    virtual void login() = 0;
    virtual void logout() = 0;
    virtual int getAge() const = 0;
};

// Create a mock class for IUser using Google Mock
class MockUser : public IUser {
public:
    MOCK_METHOD(void, login, (), (override));
    MOCK_METHOD(void, logout, (), (override));
    MOCK_METHOD(int, getAge, (), (const, override));
};

// Function that uses IUser
int processUser(IUser* user) {
    user->login();
    int age = user->getAge();
    user->logout();
    return age;
}

TEST(UserTest, ProcessUserTest) {
    MockUser mockUser;

    // Set expectations on the mock object
    EXPECT_CALL(mockUser, login()).Times(1);
    EXPECT_CALL(mockUser, getAge()).WillOnce(::testing::Return(25));
    EXPECT_CALL(mockUser, logout()).Times(1);

    // Use the mock object in the function to be tested
    int result = processUser(&mockUser);

    // Verify that expectations are met
    ASSERT_EQ(result, 25);
}
```

