const messages = {
    en: {
        common: {
            submit: "Submit",
            yes: "Yes",
            no: "No",
            save: "Save",
            cancel: "Cancel",
            refresh: "Refresh",
            upload_record: "Upload Record",
            about: "About",
            select_file: "Select File",
            upload_to_server: "Upload to Server",
        },
        auth: {
            login: "Login",
            register: "Register",
            logout: "Logout",
            profile: "Profile",
            account: "Account",
            nickname: "Nickname",
            in_game_account: "In-game Account",
            username: "Username",
            password: "Password",
            confirm_password: "Confirm Password",
            email: "Email Address",
            upload_token: "Upload Token",
            qq_number: "QQ Number",
            uuid: "In-game UUID",
            anonymous_probe: "Permit Anonymous Query",
        },
        term: {
            b50: "Best 50",
            records: "Records",
            best_records: "Best Records",
            song_level_id: "Level ID",
            song_levels: "Song Levels",
            single_info: "Single Info",
            title: "Title",
            artist: "Composer",
            level_design: "Level Design",
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
            notes: "Notes",
            score: "Score",
            replace: "Replace the Best Record",
            upload_list: "Upload List",
            level_distribution: "Level Distribution",
            level_rating_distribution: "Level-rating Distribution",
            export_b50_image: "Export B50 Table (Image)",
            record_time: "Record Time",
            upload_csv: "Import via CSV",
            export_csv: "Export CSV",
            best_only: "Best Only"
        },
        message: {
            welcome: "Welcome, {username}! ",
            success_get: "Successfully get {data_name} data",
            search: "Type to search by song title",
            required: "This field is required",
            username_length: "Length should be 6 to 16",
            username_character: "Username must be consist of letters and numbers",
            password_length: "Length should be 8 to 20",
            password_character: "Password must be consist of one capitalized letter, one letter, and a number",
            password_mismatch: "Two passwords don't match",
            register_success: "Register success",
            register_failed: "Register failed, details: ",
            login_success: "Login success",
            login_failed: "Login failed, details: ",
            get_levels_success: "Successfully get level info",
            get_levels_failed: "Failed to get level info",
            get_my_info_success: "Successfully get user profile",
            get_my_info_failed: "Failed to get user profile. Details: ",
            token_expired: "Access token has expired, please re-login",
            get_b50_trending_success: "Successfully get best 50 trending",
            get_b50_trending_failed: "Failed to get best 50 trending. Details: ",
            get_record_success: "Successfully get records",
            get_record_failed: "Failed to get records. Details: ",
            post_record_success: "Successfully upload record",
            post_record_failed: "Failed to upload record. Details: ",
            score_out_of_range: "Please input a score between 0 and 1010000",
            song_detail: "Song details",
            quick_upload: "Quick upload",
            add_to_upload_list: "Add to upload list",
            add_to_upload_list_success: "Successfully add to upload list",
            add_to_upload_list_failed: "Failed add to upload list, this level has already in the list",
            upload_csv_info: "You will import song scores in bulk by uploading a CSV file generated by the server " +
                "that you fill in yourself. Uploading in this way will overwrite the best scores, " +
                "so please be careful not to modify any fields other than the song scores to avoid import failures. " +
                "This feature is still being tested, so please use it with care.",
            refresh_upload_token_success: "Successfully refresh upload token",
            refresh_upload_token_failed: "Failed refresh upload token",
            update_profile_success: "Successfully update profile",
            update_profile_failed: "Failed to update profile",
            get_b50_img_success: "Successfully export B50 image",
            get_b50_img_failed: "Failed to export B50 image",
            get_csv_success: "Successfully export CSV",
            get_csv_failed: "Failed to export CSV",
        },
        about: {
            title: "Paradigm: Reboot Prober (Online Rating Calculator)",
            content_1: "This website serves only as a reference for calculating the Rating in the game 'Paradigm: Reboot'. " +
                "It does not guarantee that the data and calculations are 100% accurate. " +
                "Please refer to the in-game display for the official rating.",
            content_2: "This website has no affiliation with Tuner Games or any related game publishing, " +
                "development, or distribution companies. It uses publicly available online resources, " +
                "and all relevant copyrights belong to their respective owners." +
                "This website does not contain any functionality that directly accesses user data on the official server. " +
                "Please do not use this code for cyber attacks or any other abusive behavior."
        }
    },
    zh: {
        common: {
            submit: "提交",
            yes: "是",
            no: "否",
            save: "保存",
            cancel: "取消",
            refresh: "刷新",
            upload_record: "上传记录",
            about: "关于",
            select_file: "选择文件",
            upload_to_server: "上传至服务器",
        },
        auth: {
            login: "登入",
            register: "注册",
            logout: "登出",
            profile: "个人资料",
            account: "账户",
            nickname: "昵称",
            in_game_account: "游戏内账户",
            username: "用户名",
            password: "密码",
            confirm_password: "确认密码",
            email: "电子邮箱",
            upload_token: "上传成绩 Token",
            qq_number: "QQ 号",
            uuid: "游戏内 UUID",
            anonymous_probe: "允许匿名查询",
        },
        term: {
            b50: "Best 50",
            records: "记录",
            song_level_id: "谱面 ID",
            best_records: "最佳记录",
            song_levels: "定数表",
            single_info: "单曲信息",
            title: "曲名",
            artist: "曲师",
            cover: "曲绘",
            difficulty: "难度",
            level: "定数",
            fitting_level: "拟合定数",
            level_design: "谱师",
            illustrator: "画师",
            version: "版本",
            b35orb15: "新/旧版本",
            b35: "旧版本",
            b15: "新版本",
            album: "专辑",
            genre: "流派",
            length: "曲长",
            notes: "音符数量",
            score: "分数",
            replace: "替换最佳纪录",
            upload_list: "待上传列表",
            level_distribution: "定数分布",
            level_rating_distribution: "定数-Rating 分布",
            export_b50_image: "导出 B50 图片",
            record_time: "记录时间",
            upload_csv: "从 CSV 导入",
            export_csv: "导出 CSV",
            best_only: "仅最佳"
        },
        message: {
            welcome: "欢迎，{username}！",
            success_get: "成功获取 {data_name} 数据",
            search: "搜素曲名",
            required: "请输入该字段",
            username_length: "用户名长度在 6 到 16 之间",
            username_character: "用户名必须由由数字或英文字母组成",
            password_length: "密码长度在 8 到 20 之间",
            password_character: "密码必须同时包含一个大写字母、一个小写字母和一个数字",
            password_mismatch: "两次输入密码不匹配",
            register_success: "注册成功",
            register_failed: "注册失败，详情：",
            login_success: "登入成功",
            login_failed: "登入失败，详情： ",
            get_my_info_success: "成功获取个人资料",
            get_my_info_failed: "获取个人资料失败，详情：",
            token_expired: "认证信息已过期，尝试重新登入",
            get_levels_success: "成功获取谱面信息",
            get_levels_failed: "获取铺面信息失败，详情：",
            get_record_success: "成功获取成绩",
            get_record_failed: "获取成绩失败，详情： ",
            get_b50_trending_success: "成功获取 B50 趋势",
            get_b50_trending_failed: "获取 B50 趋势失败，详情：",
            post_record_success: "成功上传成绩",
            post_record_failed: "上传成绩失败，详情：",
            score_out_of_range: "请输入 0 到 1010000 间的分数",
            song_detail: "查看歌曲详情",
            quick_upload: "快捷上传",
            add_to_upload_list: "添加到待上传列表",
            add_to_upload_list_success: "成功加入待上传列表",
            add_to_upload_list_failed: "加入待上传列表失败，该谱面已经存在",
            upload_csv_info: "您将通过上传自行填写的由服务器生成的 CSV 文件进行歌曲成绩的批量导入。" +
                             "该方式进行上传将会以覆盖最佳成绩的方式进行，请注意不要修改任何除了歌曲成绩以外的字段，以免导入失败。" +
                             "该功能仍然在测试中，请小心使用。",
            refresh_upload_token_success: "成功刷新上传 Token",
            refresh_upload_token_failed: "刷新上传 Token 失败",
            update_profile_success: "成功更新个人资料",
            update_profile_failed: "更新个人资料失败",
            get_b50_img_success: "成功导出 B50 图片",
            get_b50_img_failed: "导出 B50 图片失败",
            get_csv_success: "导出 CSV 成功",
            get_csv_failed: "导出 CSV 失败",
        },
        about: {
            title: "范式：起源 查分器",
            content_1: "本查分器仅为《范式：起源》游戏 Rating 计算提供参考，不保证数据与计算 100% 正确，请以游戏内显示为准。",
            content_2: "本查分器与击弦网络及相关游戏发行、开发、分发公司无任何关系，均使用互联网公开资源，相关版权归相关方所有。" +
                "本网站不包含任何直接访问官方服务器上用户数据的功能，请勿使用本代码用于网络攻击或其他滥用行为。"
        }
    }
}

export default messages;