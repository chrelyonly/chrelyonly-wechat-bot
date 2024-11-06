import "../newdate.js"
import {http} from "../https.js";
import {FileBox} from "file-box";

function text() {
    let headers = {
        Referer: "https://v3-web.douyinvod.com/b8a067a8bdd777466a4d8f58281e3045/672af6ad/video/tos/cn/tos-cn-ve-15/owNeIAySqOgTkBUAsXBaEI5LgQfKAzAAAvzCLh/?a=6383&ch=26&cr=3&dr=0&lr=all&cd=0%7C0%7C0%7C3&cv=1&br=656&bt=656&cs=0&ds=4&ft=pEaFx4hZffPdh6~kv1zNvAq-antLjrK5Xr6NRkaHxmBEljVhWL6&mime_type=video_mp4&qs=0&rc=OTc2NzY6PGU7aDM5NWg3NUBpM2Y5OGg6Zmo0cjMzNGkzM0AzYWMtMzRhXmIxMDA1XjQvYSNpczQ2cjQwZi1gLS1kLS9zcw%3D%3D&btag=c0000e00010000&cquery=100K_100o_100w_100B_100H&dy_q=1730858095&feature_id=46a7bb47b4fd1280f3d3825bf2b29388&l=202411060954551F63A7BC0B5FBA5D3699"
    }
    http("https://v3-web.douyinvod.com/b8a067a8bdd777466a4d8f58281e3045/672af6ad/video/tos/cn/tos-cn-ve-15/owNeIAySqOgTkBUAsXBaEI5LgQfKAzAAAvzCLh/?a=6383&ch=26&cr=3&dr=0&lr=all&cd=0%7C0%7C0%7C3&cv=1&br=656&bt=656&cs=0&ds=4&ft=pEaFx4hZffPdh6~kv1zNvAq-antLjrK5Xr6NRkaHxmBEljVhWL6&mime_type=video_mp4&qs=0&rc=OTc2NzY6PGU7aDM5NWg3NUBpM2Y5OGg6Zmo0cjMzNGkzM0AzYWMtMzRhXmIxMDA1XjQvYSNpczQ2cjQwZi1gLS1kLS9zcw%3D%3D&btag=c0000e00010000&cquery=100K_100o_100w_100B_100H&dy_q=1730858095&feature_id=46a7bb47b4fd1280f3d3825bf2b29388&l=202411060954551F63A7BC0B5FBA5D3699", "get", {}, 3, headers).then(res2 => {
        console.log(res2);
    })
}
text();
