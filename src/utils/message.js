const messages = {
    en: {
        common: {
          submit: "Submit",
        },
        auth: {
            login: "Login",
            register: "Register",
            logout: "Logout",
            account: "Account",
            username: "Username",
            password: "Password",
            confirm_password: "Confirm Password",
            email: "Email Address",
        },
        term: {
            b50: "Best 50",
            records: "Play Records",
            best_records: "Best Records",
            song_levels: "Song Levels",
            single_info: "Single Info",
            title: "Title",
            artist: "Composer",
            cover: "Cover",
            illustrator: "Illustrator",
            version: "Version",
            b35orb15: "New / Old Version",
            b35: "Old version",
            b15: "New version",
            level: "Level",
            fitting_level: "Fitting Level",
            difficulty: "Difficulty",
            album: "Album",
            genre: "Genre",
            length: "Length",
            notes: "Notes"
        },
        message: {
            welcome: "Welcome, {username}! ",
            success_get: "Successfully get {data_name} data",
            search: "Type to search by song title",
            required: "This field is required",
            username_length: "Length should be 6 to 10",
            username_character: "Username must be consist of English characters and numbers",
            password_length: "Length should be 8 to 20",
            password_character: "Password must be consist of English characters and numbers",
            password_mismatch: "Two passwords don't match",
            register_success: "Register success",
            register_failed: "Register failed, details: ",
            login_success: "Login success",
            login_failed: "Login failed, possibly wrong username or password. details: "
        }
    },
    zh_cn: {
        common: {
          submit: "提交",
        },
        auth: {
            login: "登入",
            register: "注册",
            logout: "登出",
            account: "账户",
            username: "用户名",
            password: "密码",
            confirm_password: "确认密码",
            email: "电子邮箱"
        },
        term: {
            b50: "Best 50",
            records: "游玩记录",
            best_records: "最佳记录",
            song_levels: "定数表",
            single_info: "单曲信息",
            title: "曲名",
            artist: "曲师",
            cover: "曲绘",
            difficulty: "难度",
            level: "定数",
            fitting_level: "拟合定数",
            illustrator: "画师",
            version: "版本",
            b35orb15: "新/旧版本",
            b35: "旧版本",
            b15: "新版本",
            album: "专辑",
            genre: "流派",
            length: "曲长",
            notes: "音符数量"
        },
        message: {
            welcome: "欢迎，{username}！",
            success_get: "成功获取 {data_name} 数据",
            search: "搜素曲名",
            required: "请输入该字段",
            username_length: "用户名长度在 6 到 10 之间",
            username_character: "用户名必须由由数字或英文字母组成",
            password_length: "密码长度在 8 到 10 之间",
            password_character: "密码必须同时包含字母和数字",
            password_mismatch: "两次输入密码不匹配",
            register_success: "注册成功",
            register_failed: "注册失败，详情：",
            login_success: "登入成功",
            login_failed: "登入成功，可能是用户名或者密码错误。详情： "
        }
    }
}

export default messages;