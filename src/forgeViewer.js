const SpinalViewer = require("./spinalViewer");

var ForgeViewer = class ForgeViewer extends SpinalViewer {
  constructor(viewer) {
    super();
    this.viewer = viewer;
    this.externalIdMapping = {};
  }

  /**
   * This function takes as parameter an external_id (string) or a list of external_id and selects the item(s) corresponding to this/these external_id
   * @param {Array.<string>} externalIds
   */
  selectObject(externalIds) {
    var allPromise = [];

    if (!Array.isArray(externalIds)) externalIds = [externalIds];

    for (var i = 0; i < externalIds.length; i++) {
      allPromise.push(this.getDbIdByExternalId(externalIds[i]));
    }

    Promise.all(allPromise).then(listDbId => {
      this.viewer.select(listDbId);
    });
  }

  /**
   * function taking in parameter an externalId (string) and returning a Promise of corresponding dbId (number)
   * @param {string} externalId
   */
  getDbIdByExternalId(externalId) {
    return new Promise((resolve, reject) => {
      if (this.externalIdMapping[externalId]) {
        resolve(this.externalIdMapping[externalId]);
      } else {
        this.viewer.model.getExternalIdMapping(
          el => {
            var dbId = el[externalId];
            this.externalIdMapping[externalId] = dbId;
            resolve(dbId);
          },
          () => {
            reject("No dbId associated at this externalId");
          }
        );
      }
    });
  }

  /**
   * This function takes in parameter a dbId (number) and return the corresponding external id (string)
   * @param {int} dbId
   */
  getExternalIdByDbId(dbId) {
    return new Promise((resolve, reject) => {
      this.viewer.model.getProperties(
        dbId,
        itemProperties => {
          resolve(itemProperties.externalId);
        },
        () => {
          reject("No external id associated at this dbId");
        }
      );
    });
  }

  /**
   * function retrieving all selected items and returning a list of external_id
   */
  getselectedObject() {
    var itemsDbIds = this.viewer.getSelection();

    return new Promise((resolve, reject) => {
      var allPromise = [];
      if (itemsDbIds.length > 0) {
        for (var i = 0; i < itemsDbIds.length; i++) {
          console.log(
            "externalId",
            itemsDbIds[i],
            this.getExternalIdByDbId(itemsDbIds[i])
          );
          allPromise.push(this.getExternalIdByDbId(itemsDbIds[i]));
        }

        Promise.all(allPromise).then(el => {
          resolve(el);
        });
      } else {
        reject("no Item Selected");
      }
    });
  }

  /**
   * This function takes in parameter an external_id (string) or a list of external_id and zoom the viewer on the corresponding elements
   * @param {Array.<string>} externalId
   */
  fitToView(externalId) {
    var allPromises = [];

    if (!Array.isArray(externalId)) externalId = [externalId];

    console.log(externalId);

    for (var i = 0; i < externalId.length; i++) {
      allPromises.push(this.getDbIdByExternalId(externalId[i]));
    }

    Promise.all(allPromises).then(ids => {
      console.log("ids", ids);
      this.viewer.fitToView(ids);
    });
  }

  /**
   *This function takes an external_id (string) or a list of external_id in parameter and display only the items corresponding to external_id
   * @param {Array.<string>} externalId
   */
  isolate(externalId) {
    var allPromises = [];

    if (!Array.isArray(externalId)) externalId = [externalId];

    console.log(externalId);

    for (var i = 0; i < externalId.length; i++) {
      allPromises.push(this.getDbIdByExternalId(externalId[i]));
    }

    Promise.all(allPromises).then(ids => {
      this.viewer.isolateById(ids);
    });
  }


  /**
   *This function takes 3 parameters, appId (the application's ID), externalId (the id of the coloring element) and color (color name or hexadecimal color). It colors the element(s) according to the color and the appId
   *
   * @param {string} appId
   * @param {Array.<string>} externalId
   * @param {string} color
   */
  colorObject(appId, externalId, color) {
    var allPromises = [];

    if (!Array.isArray(externalId))
      externalId = [externalId];

    for (var i = 0; i < externalId.length; i++) {
      allPromises.push(this.getDbIdByExternalId(externalId[i]));
    }

    Promise.all(allPromises).then(ids => {
      this.viewer.setColorMaterial(ids, color, appId);
    })


  }

  /**
   * This function takes in parameter an appId and external_id/list of external_id. It restore the default color of the element(s) according to the appId
   * @param {String} appId
   * @param {Array.<string>} externalId
   */
  restoreColor(appId, externalId) {
    var allPromises = [];

    if (!Array.isArray(externalId))
      externalId = [externalId];

    for (var i = 0; i < externalId.length; i++) {
      allPromises.push(this.getDbIdByExternalId(externalId[i]));
    }

    Promise.all(allPromises).then(el => {
      this.viewer.restoreColorMaterial(el, appId);
    })

  }


  /**
   * 
   * @param {number} rootId 
   * @param {function} callback
   */
  sweep(rootId = this.viewer.model.getRootId(), callback) {
    // var rootId = this.viewer.model.getRootId();

    return new Promise((resolve) => {
      this.model.getData().instanceTree.enumNodeChildren(rootId, el => {
        if (el) {
          callback(el);
          this.sweep(el, callback).then(() => {
            resolve(false);
          });
        } else {
          resolve(false);
        }

      })
    })

  }


  /**
   *
   */
  getCamera() {}

  /**
   *
   */
  setCamera() {}

  /**
   *
   */
  resgisterEvent() {}

  /**
   *
   */
  getCutPlanes() {}

  /**
   *
   */
  setCutPlanes() {}

  /**
   *
   */
  createPanel() {}
};

module.exports = ForgeViewer;