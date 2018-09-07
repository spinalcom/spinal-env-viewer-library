const SpinalViewer = require('./spinalViewer');


var ForgeViewer = class ForgeViewer extends SpinalViewer {

  constructor(viewer) {

    super();
    this.viewer = viewer;
    this.externalIdMapping = {};
  }

  /**
   * This function takes as parameter an external_id (string) or a list of external_id and selects the item(s) corresponding to this/these dbId 
   * @param {Array.<string>} externalIds
   */
  selectObject(externalIds) {
    if (!Array.isArray(externalIds))
      externalIds = [externalIds];

    this.viewer.select(this.getDbIdByExternalId(externalIds));

  }

  /**
   * function taking in parameter an externalId (string) and returning a Promise of corresponding dbId
   * @param {string} externalId 
   */
  getDbIdByExternalId(externalId) {
    var dbId = [];

    if (!Array.isArray(externalId))
      externalId = [externalId];


    for (var i = 0; i < externalId.length; i++) {
      var ext = externalId[i]
      console.log("external[i]", ext);

      if (this.externalIdMapping[ext]) {
        dbId.push(this.externalIdMapping[ext]);
      } else {
        this.viewer.model.getExternalIdMapping((el) => {
          console.log("this", el[ext]);
          dbId.push(el[ext]);
          this.externalIdMapping[ext] = dbId;
        })
      }

    }


    return dbId;

  }

  /**
   * function retrieving all selected items and returning a list of external_id
   */
  getselectedObject() {
    var itemsDbIds = this.viewer.getSelection();

    var externalIds = [];

    if (itemsDbIds.length > 0) {
      for (var i = 0; i < itemsDbIds.length; i++) {
        this.viewer.model.getProperties(itemsDbIds[i], (itemProperties) => {
          console.log(itemProperties.externalId);
          externalIds.push(itemProperties.externalId);
        })
      }
    }

    return externalIds;

  }



  /**
   * This function takes in parameter an external_id (string) or a list of external_id and zoom
   * @param {Array.<string>} externalId 
   */
  fitToView(externalId) {
    if (Array.isArray(externalId)) externalId = [externalId];

    var ids = this.getDbIdByExternalId(externalId);

    this.viewer.fitToView(ids);

  }


  /**
   * 
   * @param {Array.<string>} externalId 
   */
  isolate(externalId) {

  }

  /**
   * 
   */
  sweep() {

  }

  /**
   * 
   * @param {string} appId 
   * @param {Array.<string>} dbIds 
   * @param {string} color
   */
  colorObject(appId, dbIds, color) {

  }

  /**
   * 
   * @param {String} appId 
   * @param {Array.<string>} dbIds 
   */
  restoreColor(appId, dbIds) {

  }

  /**
   * 
   */
  getCamera() {

  }

  /**
   * 
   */
  setCamera() {

  }

  /**
   * 
   */
  getDbId() {

  }

  /**
   * 
   */
  getExternalId() {

  }

  /**
   * 
   */
  resgisterEvent() {

  }

  /**
   * 
   */
  getCutPlanes() {

  }

  /**
   * 
   */
  setCutPlanes() {

  }

  /**
   * 
   */
  createPanel() {

  }



}

module.exports = ForgeViewer;