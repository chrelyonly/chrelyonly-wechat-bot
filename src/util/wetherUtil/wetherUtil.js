import {log} from "wechaty";

/**
 * 天气查询工具
 */
export const WeatherUtil = {
    /**
     * 查询天气
     * @param city 城市
     */
    queryWeather(city: string): Promise<string> {
        const url = `https://www.tianqiapi.com/api/?version=v6&city=${encodeURIComponent(city)}`;
        const response = axios.get(url);
        const data = response.data;
        log.info("WeatherUtil", `queryWeather(${city}) => ${JSON.stringify(data)}`);
        return `城市：${data.city}\n日期：${data.date}\n天氩：${data.wea}\n温度：${data.tem2}~${data.tem1}\n风向：${data.win}\n空气质量：${data.air_level}`;
    }
}
