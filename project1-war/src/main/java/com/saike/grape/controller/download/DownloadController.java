package com.saike.grape.controller.download;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.saike.grape.utils.CustomizedPropertyPlaceholderConfigurer;

/**
 * 下载主页面跳转Controller
 */
@Controller
@RequestMapping(value = "/app/bygj")
public class DownloadController {

    @RequestMapping(value = "/download")
    public ModelAndView download(Model model, HttpServletRequest request) throws Exception {
        ModelAndView mav = new ModelAndView("download");
        //mav.addObject("message", "DownloadController的测试文字信息");
        Map<String, String> map = CustomizedPropertyPlaceholderConfigurer.ctxPropertiesMap;
        for ( String key : map.keySet()) {
            String value = map.get(key);
            //System.out.println(key+"====>>>>"+value);
        }
        return mav;
    }
}
