package de.neuefische.rikardo.dub.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactRoutingForwarding {

    @RequestMapping(value = "/**/{[path:[^\\.]*}")
    public String forwardToRoutUrl() {
        return "forward:/";
    }
}
