Feature: Logging in
 
  @test02
  Scenario: 測試按鈕
    Given I have previously created a password
    When I enter my password correctly
    Then I should be granted access

  @test03
  Scenario: 測試按鈕
    Given I have previously created a password
    When I enter my password correctly
    Then I should be granted access


# -----------------------------------------------------------------------

Feature: Getting rich writing software
 
Scenario: Depositing a paycheck
  Given function add 1
  When I get paid $1000000 for writing some awesome code
  Then my account balance should be $1000010


# -----------------------------------------------------------------------

Feature: Todo List
 
Scenario: Adding an item to my todo list
  Given my todo list currently looks as follows:
  | TaskName            | Priority |
  | Fix bugs in my code | medium   |
  | Document my hours   | medium   |
  When I add the following task:
  | TaskName                              | Priority |
  | Watch cat videos on YouTube all day   | high     |
  Then I should see the following todo list:
  | TaskName                              | Priority |  
  | Watch cat videos on YouTube all day   | high     |
  | Sign up for unemployment              | high     |

# ----------------------------------------------------------------

Feature: Online sales
 
Scenario Outline: Selling an item
  Given I have a(n) <Item>
  When I sell the <Item>
  Then I should get $<Amount>
 
  Examples:
 
  | Item                                           | Amount |
  | Autographed Neil deGrasse Tyson book           | 100    |
  | Rick Astley t-shirt                            | 22     |
  | An idea to replace EVERYTHING with blockchains | $0     |