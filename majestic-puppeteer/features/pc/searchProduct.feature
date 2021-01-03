Feature: 搜尋功能 viewSize:1920*1080
  Scenario: 輸入指定條件並搜尋
     When 在首頁"url"
    Given 輸入"18K"
      And 按"Enter"
     Then 確認網址為"url"

  Scenario: 點擊底下提供的條件並搜尋
     When 在首頁"url"
    Given 點擊"串飾"
     Then 確認網址為"url"

  Scenario: 關閉 熱門搜尋關鍵詞 視窗
     When 在首頁"url"
    Given 叫出視窗
      And 點擊右上角的 x
     Then 確認視窗關閉

  Scenario: 在 searchResult Page 選擇排序並搜尋
     When 在搜尋頁"url"
    Given 確認預設是否為"關聯性"
      And 點擊下拉選單並選擇"最新上架"
     Then 確認搜尋結果第一筆商品是否已變更

  Scenario: 在 searchResult Page 滾動往下
     When 在搜尋頁"url"
    Given 往下滾動
     Then 確認頁面商品數量是否變多