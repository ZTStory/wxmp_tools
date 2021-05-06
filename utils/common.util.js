export const CommonUtils = {
    isArray: function (instance) {
        return instance.constructor.toString().indexOf("Array") > -1;
    },
    isDate: function (instance) {
        return instance.constructor.toString().indexOf("Date") > -1;
    },
    encryptIdCode(idCode) {
        if (idCode.length >= 15) {
            return idCode.slice(0, 6) + "********" + idCode.slice(14);
        } else if (idCode.length >= 6) {
            return idCode.slice(0, 4) + "****";
        }
        return "";
    },
    //  重写加法
    numAdd(num1, num2) {
        var baseNum, baseNum1, baseNum2, n;
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        n = baseNum1 > baseNum2 ? baseNum1 : baseNum2;
        return ((num1 * baseNum + num2 * baseNum) / baseNum).toFixed(n);
    },
    /**
     * 重写减法
     * @param {*} num1
     * @param {*} num2
     */
    numSub(num1, num2) {
        var baseNum, baseNum1, baseNum2;
        var precision; // 精度
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        precision = baseNum1 >= baseNum2 ? baseNum1 : baseNum2;
        return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
    },
    //  重写乘法
    numMulti(num1, num2) {
        var baseNum = 0;
        try {
            baseNum += num1.toString().split(".")[1].length;
        } catch (e) { }
        try {
            baseNum += num2.toString().split(".")[1].length;
        } catch (e) { }
        return (Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", ""))) / Math.pow(10, baseNum);
    },
    /**
     * 节流工厂（delay时间内，只执行一次动作，若有新事件触发，不执行。）
     * @param {Function} func 需要节流的方法
     * @param {number} [delay=800] 毫秒
     * @returns {Function}
     */
    throttle: (func, delay) => {
        return (...args) => {
            if (!func.throttleLastTime) {
                func.throttleLastTime = 0;
            }
            delay = delay || 800;
            const now = +Date.now();
            if (now > func.throttleLastTime + delay) {
                func.throttleLastTime = now;
                func.apply(this, args);
            }
        };
    },
    /**
     * 防抖工厂（delay时间内，只执行一次）当事件快速连续不断触发时，动作只会执行一次
     * @param {Function} func 需要防抖处理的方法
     * @param {number} [delay=800] 毫秒
     * @returns {Function}
     */
    debounce: (func, delay) => {
        return (...args) => {
            if (func.debounceTimer) {
                clearTimeout(func.debounceTimer);
            }
            func.debounceTimer = setTimeout(() => {
                func.apply(this, args);
            }, delay || 800);
        };
    },
    /**
     * 是否不为空
     * @param {Any} anyObj
     */
    isNotBlank(anyObj) {
        if (
            anyObj === "" ||
            (Array.isArray(anyObj) && anyObj.length == 0) ||
            JSON.stringify(anyObj) == "{}" ||
            anyObj === undefined ||
            anyObj === "undefined" ||
            anyObj === null ||
            anyObj === "null"
        ) {
            return false;
        }
        return true;
    },
    isBlank(anyObj) {
        if (
            anyObj === "" ||
            (Array.isArray(anyObj) && anyObj.length == 0) ||
            JSON.stringify(anyObj) == "{}" ||
            anyObj === undefined ||
            anyObj === "undefined" ||
            anyObj === null ||
            anyObj === "null"
        ) {
            return true;
        }
        return false;
    },
    /**
     * 复制文本
     * @param {string} text
     */
    copyText(text) {
        wx.setClipboardData({
            data: text,
            success: () => {
                DialogUtils.showToast("复制成功");
            },
            fail: () => {
                DialogUtils.showToast("复制失败");
            },
        });
    },
    /**
     * 数字转中文数字
     * @param {Number} num  0~10的数字转中文
     */
    number2chinese(num) {
        if (num < 0 || num > 10) {
            DialogUtils.showToast("请输入0-10的数字");
            return;
        }
        let unichar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
        return unichar[num];
    },
    /**
     * 格式化数字
     * @param {Number} n 数字
     */
    formatNumber(n) {
        n = n.toString();
        return n[1] ? n : "0" + n;
    },
    quickSort(array, prop) {
        const sort = (arr, left = 0, right = arr.length - 1) => {
            if (left >= right) {
                //如果左边的索引大于等于右边的索引说明整理完毕
                return;
            }
            let i = left;
            let j = right;
            const baseVal = arr[j]; // 取无序数组最后一个数为基准值
            while (i < j) {
                //把所有比基准值小的数放在左边大的数放在右边
                while (i < j && arr[i][prop] <= baseVal[prop]) {
                    //找到一个比基准值大的数交换
                    i++;
                }
                arr[j] = arr[i]; // 将较大的值放在右边如果没有比基准值大的数就是将自己赋值给自己（i 等于 j）
                while (j > i && arr[j][prop] >= baseVal[prop]) {
                    //找到一个比基准值小的数交换
                    j--;
                }
                arr[i] = arr[j]; // 将较小的值放在左边如果没有找到比基准值小的数就是将自己赋值给自己（i 等于 j）
            }
            arr[j] = baseVal; // 将基准值放至中央位置完成一次循环（这时候 j 等于 i ）
            sort(arr, left, j - 1); // 将左边的无序数组重复上面的操作
            sort(arr, j + 1, right); // 将右边的无序数组重复上面的操作
        };
        const newArr = array.concat(); // 为了保证这个函数是纯函数拷贝一次数组
        sort(newArr);
        return newArr;
    },
    /**
     * 深拷贝对象
     * @param {Any} target 
     */
    deepCopy(target) {
        let result = null;
        if (typeof target === 'object') {
            if (Array.isArray(target)) {
                result = [];
                for (const element of target) {
                    result.push(this.deepCopy(element));
                }
            } else if (target == null) {
                result = null;
            } else if (target.constructor === RegExp) {
                result = target;
            } else {
                result = {};
                for (const key in target) {
                    const element = target[key];
                    result[key] = this.deepCopy(element);
                }
            }
        } else {
            result = target;
        }
        return result;
    }
}