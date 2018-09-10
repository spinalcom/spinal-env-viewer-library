<a name="ForgeViewer"></a>

## ForgeViewer ⇐ <code>SpinalViewer</code>
**Kind**: global class  
**Extends**: <code>SpinalViewer</code>  

* [ForgeViewer](#ForgeViewer) ⇐ <code>SpinalViewer</code>
    * [.selectObject(externalIds)](#ForgeViewer+selectObject)
    * [.getDbIdByExternalId(externalId)](#ForgeViewer+getDbIdByExternalId)
    * [.getExternalIdByDbId(dbId)](#ForgeViewer+getExternalIdByDbId)
    * [.getselectedObject()](#ForgeViewer+getselectedObject)
    * [.fitToView(externalId)](#ForgeViewer+fitToView)
    * [.isolate(externalId)](#ForgeViewer+isolate)
    * [.colorObject(appId, externalId, color)](#ForgeViewer+colorObject)
    * [.restoreColor(appId, externalId)](#ForgeViewer+restoreColor)
    * [.sweep(rootId, callback)](#ForgeViewer+sweep)
    * [.getCamera()](#ForgeViewer+getCamera)
    * [.setCamera()](#ForgeViewer+setCamera)
    * [.resgisterEvent()](#ForgeViewer+resgisterEvent)
    * [.getCutPlanes()](#ForgeViewer+getCutPlanes)
    * [.setCutPlanes()](#ForgeViewer+setCutPlanes)
    * [.createPanel()](#ForgeViewer+createPanel)

<a name="ForgeViewer+selectObject"></a>

### forgeViewer.selectObject(externalIds)
This function takes as parameter an external_id (string) or a list of external_id and selects the item(s) corresponding to this/these external_id

**Kind**: instance method of [<code>ForgeViewer</code>](#ForgeViewer)  

| Param | Type |
| --- | --- |
| externalIds | <code>Array.&lt;string&gt;</code> | 

<a name="ForgeViewer+getDbIdByExternalId"></a>

### forgeViewer.getDbIdByExternalId(externalId)
function taking in parameter an externalId (string) and returning a Promise of corresponding dbId (number)

**Kind**: instance method of [<code>ForgeViewer</code>](#ForgeViewer)  

| Param | Type |
| --- | --- |
| externalId | <code>string</code> | 

<a name="ForgeViewer+getExternalIdByDbId"></a>

### forgeViewer.getExternalIdByDbId(dbId)
This function takes in parameter a dbId (number) and return the corresponding external id (string)

**Kind**: instance method of [<code>ForgeViewer</code>](#ForgeViewer)  

| Param | Type |
| --- | --- |
| dbId | <code>int</code> | 

<a name="ForgeViewer+getselectedObject"></a>

### forgeViewer.getselectedObject()
function retrieving all selected items and returning a list of external_id

**Kind**: instance method of [<code>ForgeViewer</code>](#ForgeViewer)  
<a name="ForgeViewer+fitToView"></a>

### forgeViewer.fitToView(externalId)
This function takes in parameter an external_id (string) or a list of external_id and zoom the viewer on the corresponding elements

**Kind**: instance method of [<code>ForgeViewer</code>](#ForgeViewer)  

| Param | Type |
| --- | --- |
| externalId | <code>Array.&lt;string&gt;</code> | 

<a name="ForgeViewer+isolate"></a>

### forgeViewer.isolate(externalId)
This function takes an external_id (string) or a list of external_id in parameter and display only the items corresponding to external_id

**Kind**: instance method of [<code>ForgeViewer</code>](#ForgeViewer)  

| Param | Type |
| --- | --- |
| externalId | <code>Array.&lt;string&gt;</code> | 

<a name="ForgeViewer+colorObject"></a>

### forgeViewer.colorObject(appId, externalId, color)
This function takes 3 parameters, appId (the application's ID), externalId (the id of the coloring element) and color (color name or hexadecimal color). It colors the element(s) according to the color and the appId

**Kind**: instance method of [<code>ForgeViewer</code>](#ForgeViewer)  

| Param | Type |
| --- | --- |
| appId | <code>string</code> | 
| externalId | <code>Array.&lt;string&gt;</code> | 
| color | <code>string</code> | 

<a name="ForgeViewer+restoreColor"></a>

### forgeViewer.restoreColor(appId, externalId)
This function takes in parameter an appId and external_id/list of external_id. It restore the default color of the element(s) according to the appId

**Kind**: instance method of [<code>ForgeViewer</code>](#ForgeViewer)  

| Param | Type |
| --- | --- |
| appId | <code>String</code> | 
| externalId | <code>Array.&lt;string&gt;</code> | 

<a name="ForgeViewer+sweep"></a>

### forgeViewer.sweep(rootId, callback)
**Kind**: instance method of [<code>ForgeViewer</code>](#ForgeViewer)  

| Param | Type |
| --- | --- |
| rootId | <code>number</code> | 
| callback | <code>function</code> | 

<a name="ForgeViewer+getCamera"></a>

### forgeViewer.getCamera()
**Kind**: instance method of [<code>ForgeViewer</code>](#ForgeViewer)  
<a name="ForgeViewer+setCamera"></a>

### forgeViewer.setCamera()
**Kind**: instance method of [<code>ForgeViewer</code>](#ForgeViewer)  
<a name="ForgeViewer+resgisterEvent"></a>

### forgeViewer.resgisterEvent()
**Kind**: instance method of [<code>ForgeViewer</code>](#ForgeViewer)  
<a name="ForgeViewer+getCutPlanes"></a>

### forgeViewer.getCutPlanes()
**Kind**: instance method of [<code>ForgeViewer</code>](#ForgeViewer)  
<a name="ForgeViewer+setCutPlanes"></a>

### forgeViewer.setCutPlanes()
**Kind**: instance method of [<code>ForgeViewer</code>](#ForgeViewer)  
<a name="ForgeViewer+createPanel"></a>

### forgeViewer.createPanel()
**Kind**: instance method of [<code>ForgeViewer</code>](#ForgeViewer)  
