/*
 * Author  Murphy.xie
 * Date  2022-10-07 13:31:20
 * LastEditors  Murphy.xie
 * LastEditTime  2022-11-03 13:53:09
 * Description database处理
 */

export default class DB {
  // 单例
  static shareInstance = new DB();

  // 数据库名称
  #dataBaseName = 'threeJsDataBase';

  // 模型表
  #modelTableName = 'threemodel';

  // 版本号
  #dataBaseVersion = 2;

  // 操作数据库
  #targetDataBase = null;

  destory() {
    //
  }

  open() {
    if (this.#targetDataBase !== null) {
      return Promise.resolve(this.#targetDataBase);
    }
    return new Promise((reslove, reject) => {
      // 打开数据库
      const dbRequest = window.indexedDB.open(this.#dataBaseName, this.#dataBaseVersion);
      dbRequest.onsuccess = (event) => {
        // console.log(' 数据库打开成功 ', event);
        const dataBase = dbRequest.result;
        this.targetDataBase = dataBase;
        this.addDbObserver(dataBase);
        reslove(this.targetDataBase);
      };
      dbRequest.onerror = (event) => {
        console.log(' 数据库打开失败 ', event);
        reject(event);
      };
      dbRequest.onupgradeneeded = (event) => {
        // console.log(' 数据库版本不一致 ', event);
        const db = event.target.result;
        // 创建 模型 存储表
        let objectStore;
        if (!db.objectStoreNames.contains(this.#modelTableName)) {
          objectStore = db.createObjectStore(this.#modelTableName, {
            keyPath: 'fullPath'
          });

          if (objectStore instanceof IDBObjectStore) {
            // 模型名称
            objectStore.createIndex('name', 'name', { unique: false });
            // 模型完整路径
            objectStore.createIndex('fullPath', 'fullPath', { unique: true });
            // 数据类型
            objectStore.createIndex('type', 'type', { unique: false });
            // 数据流
            objectStore.createIndex('data', 'data', { unique: false });
          }
        } else {
          // clear
          // db.transaction(this.#modelTableName, 'readwrite')
          //   .objectStore(this.#modelTableName)
          //   .clear();
        }
      };

      dbRequest.blocked = (e) => {
        console.log(' 当前数据库连接暂未关闭 ', e);
      };
    });
  }

  /**
     * add db observer
     */
  addDbObserver = (db) => {
    if (db instanceof IDBDatabase) {
      db.onabort = (e) => {
        console.log(' 数据库被终止操作 ', e);
      };

      db.onclose = (e) => {
        console.log(' 数据库被关闭事件 ', e);
      };

      db.onerror = (e) => {
        console.log(' 数据库出错事件 ', e);
      };

      db.onversionchange = (e) => {
        console.log(' 数据库版本改变事件 ', e);
      };
    }
  };

  /**
     * insert model in fullpath
     * @param {*} obj 数据信息
     */
  insertModel = (fullPath = '', data = {}, dataType = 'blob') =>
    new Promise((reslove, reject) => {
      this.open()
        .then((db) => {
          if (db instanceof IDBDatabase) {
            const request = db
              .transaction(this.#modelTableName, 'readwrite')
              .objectStore(this.#modelTableName)
              .add({
                name: fullPath,
                fullPath,
                type: dataType,
                data
              });
            request.onsuccess = (e) => {
              reslove(data);
            };
            request.onerror = (e) => {
              reject(e);
            };
          } else {
            reject(new Error('db type invali'));
          }
        })
        .catch((e) => {
          reject(e);
        });
    });

  /**
     * query all models
     */
  queryModels = () =>
    new Promise((reslove, reject) => {
      this.open()
        .then((db) => {
          if (db instanceof IDBDatabase) {
            const request = db
              .transaction(this.#modelTableName, 'readonly')
              .objectStore(this.#modelTableName)
              .getAll();
            request.onsuccess = (e) => {
              reslove(request.result);
            };
            request.onerror = (e) => {
              reject(e);
            };
          }
        })
        .catch((e) => {
          reject(e);
        });
    });

  /**
     * get model by fullpath
     * @param {*} fullPath 完整地址
     */
  getModelByFullPath = (fullPath = '') =>
    new Promise((reslove, reject) => {
      this.open().then((db) => {
        if (db instanceof IDBDatabase) {
          const request = db
            .transaction(this.#modelTableName, 'readonly')
            .objectStore(this.#modelTableName)
            .get(fullPath);
          request.onsuccess = (e) => {
            reslove(request.result);
          };
          request.onerror = (e) => {
            reject(e);
          };
        }
      });
    });

  /**
     * clear model
     */
  clearModel = () =>
    new Promise((reslove, reject) => {
      this.open().then((db) => {
        if (db instanceof IDBDatabase) {
          const request = db
            .transaction(this.#modelTableName, 'readwrite')
            .objectStore(this.#modelTableName)
            .clear();
          request.onsuccess = (e) => {
            reslove(request.result);
          };
          request.onerror = (e) => {
            reject(e);
          };
        }
      });
    });
}
