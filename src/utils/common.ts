export function debounce(fn: (...args: any[]) => any, wait: number) {
  let interval;
  return function (...args) {
    if (interval) {
      clearTimeout(interval);
    }
    interval = setTimeout(function () {
      fn(...args);
      clearTimeout(interval);
      interval = undefined;
    }, wait);
  };
}

export function throttle(fn: (...args: any[]) => any, wait = 0) {
  let isActive = false;
  return function (...args) {
    if (isActive) {
      return;
    }
    isActive = true;
    fn(...args);
    setTimeout(function () {
      isActive = false;
    }, wait);
  };
}

// 获取url中的所有参数
export function getQueryParams<T extends object>(
  url = document.location.toString(),
) {
  url = decodeURI(url);
  const arr1 = url.split('?');
  const obj = {};
  if (arr1.length > 1) {
    const index = arr1[1].indexOf('#');
    arr1[1] = index == -1 ? arr1[1] : arr1[1].slice(0, index);
    const arr2 = arr1[1].split('&');
    for (let i = 0; i < arr2.length; i++) {
      const curArr: string[] = arr2[i].split('=');
      obj[curArr[0]] = decodeURIComponent(curArr[1]);
    }
  }
  return obj as { [key: string]: T };
}

// 获取url中特定参数
export function getQueryParamByKey(paramName: string) {
  let url = document.location.toString();
  url = decodeURI(url);
  const arrObj = url.split('?');
  if (arrObj.length > 1) {
    const arrPara = arrObj[1].split('&');
    let arr;
    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=');
      if (arr != null && arr[0] == paramName) {
        return decodeURIComponent(arr[1]);
      }
    }
    return '';
  } else {
    return '';
  }
}

// 路径拼接
export function pathSplicing(path: string, query: object) {
  path = /^\/\S{1,}\?\S{1,}$/.test(path) ? path + '&' : path + '?';
  return (
    path +
    Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join('&')
  );
}
