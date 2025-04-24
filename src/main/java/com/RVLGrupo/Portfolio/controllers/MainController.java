package com.RVLGrupo.Portfolio.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class MainController {

    @GetMapping("")
    public ModelAndView showHome() {
        return new ModelAndView("HomePage/index");
    }

    @GetMapping("/institucional")
    public ModelAndView showInstitucional() {
        return new ModelAndView("Institucional/index");
    }

    @GetMapping("/solucoes")
    public ModelAndView showSolucoes() {
        return new ModelAndView("Solucoes/index");
    }

    @GetMapping("/contato")
    public ModelAndView showContato() {
        return new ModelAndView("Contato/index");
    }
}
