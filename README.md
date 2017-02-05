# yzpUI
##Example
```html
<!DOCTYPE html>
<html>
    <title>yzpUI</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="Font-Awesome-3.2.1/css/font-awesome.css"></link>
    <link rel="stylesheet" href="yzpUI.css"></link>
    <body ng-app="app">
    <yzp-button content="small" yzp-style="small bigRadius solid"></yzp-button>
    <yzp-button content="middle" yzp-style="middle smallRadius hollow"></yzp-button>
    <yzp-button content="large" yzp-style="large metaphor"></yzp-button>
    <yzp-input placeholder="test" yzp-style="small bigRadius solid" yzp-value="inputmodel"><yzp-datalist list=[1111,2222,3333]></yzp-datalist></yzp-input>
    <yzp-input placeholder="test" yzp-style="middle smallRadius hollow" yzp-value="inputmodel2"></yzp-input>
    <yzp-input placeholder="test" yzp-style="large hollow" yzp-value="inputmodel3"></yzp-input>
    <yzp-number yzp-style="small" yzp-value=11 max=200000 min=5></yzp-number>
    <yzp-number yzp-style="middle" yzp-value=11 max=200000 min=5></yzp-number>
    <yzp-number yzp-style="large" yzp-value=11 max=200000 min=5></yzp-number>
    <br>
    <yzp-checkbox yzp-style="small" checked=true type="Checkbox"></yzp-checkbox>
    <yzp-checkbox yzp-style="middle" checked=false type="Checkbox"></yzp-checkbox>
    <yzp-checkbox yzp-style="large" checked=true type="Checkbox"></yzp-checkbox>
    <br
    <yzp-checkbox yzp-style="small" checked=true type="Radio"></yzp-checkbox>
    <yzp-checkbox yzp-style="middle" checked=true type="Radio"></yzp-checkbox>
    <yzp-checkbox yzp-style="large" checked=true type="Radio"></yzp-checkbox>
    <yzp-radio yzp-style="small smallRadius" radio-list=["选项一","选项二"] label="单选" checked-index=0></yzp-radio>
    <yzp-checkbutton yzp-style="small smallRadius" checkbutton-list=["选项一","选项二","选项三"]  label="复选" checked-index=[1,2]></yzp-checkbutton>
    <yzp-select yzp-style="small hollow" select-name="性别" select-list=[11111,22222,33333,444444,55555,66666,77777] yzp-model="mymodel" placeholder="请下拉选择"></yzp-select>
    <yzp-dropmenu yzp-style="small bigRadius metaphor" content='下拉菜单' dropmenu-list=['item1','item2','item3'] yzp-actions=['alert(1);','alert(2);','alert(3);']></yzp-dropmenu>
    <yzp-dropmenu yzp-style="middle hollow" content='下拉菜单' dropmenu-list=['item1','item2','item3'] ></yzp-dropmenu>
    <yzp-dropmenu yzp-style="large smallRadius solid" content='下拉菜单' dropmenu-list=['item1','item2','item3'] ></yzp-dropmenu>
    <yzp-datepicker yzp-style="small smallRadius hollow"month="12" year=2017 day=20 placeholder="请输入时间"></yzp-datepicker>
    <yzp-button content="弹出框" yzp-style="small bigRadius metaphor" ng-click="showBox=true"></yzp-button>
    <yzp-button content="警告框" yzp-style="small bigRadius metaphor"><yzp-alert alert-infor="yzpUI,a beautiful and powerful UI framework!"></yzp-alert></yzp-button>
    <yzp-button content="加载框" yzp-style="small bigRadius metaphor"><yzp-load yzp-id="loading" speed=6></yzp-load></yzp-alert></yzp-button>
    <yzp-dragbox yzp-title="yzpDragbox" x=500 y=200 width="1000px" height="600px" yzp-src="iframe.html" is-show="showBox"></yzp-dragbox>
    <yzp-pageturn yzp-style="small hollow" page-num=1 page-maxnum=5 show-num=8></yzp-pageturn>
    <yzp-pageturn yzp-style="middle solid" page-num=1 page-maxnum=6 show-num=4></yzp-pageturn>
    <yzp-pageturn yzp-style="large metaphor" page-num=1 page-maxnum=10 show-num=5></yzp-pageturn>
    <yzp-range start-range=0 end-range=10 yzp-value=5 length=1000 yzp-id="myrange" width=30 precision=1></yzp-range>
    <yzp-file label="上传"></yzp-file>
    <yzp-colorpicker label="请选择颜色" yzp-value="#646bf8"></yzp-colorpicker>
    <yzp-bar yzp-id="mybar" data=[10,20,30,40,50,60,70,80] serial=["项目一","项目二","项目三","项目四","项目五","项目六","项目七","项目八"] color="rgb(100,200,200)" width=500 height=500></yzp-bar>
    <script src="angular.min.js"></script>
    <script src="yzpUI.js"></script>
  </body>
</html>
```
