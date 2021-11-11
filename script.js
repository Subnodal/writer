/*
    Subnodal Writer

    Copyright (C) Subnodal Technologies. All Rights Reserved.

    https://writer.subnodal.com
    Licenced by the Subnodal Open-Source Licence, which can be found at LICENCE.md.
*/

namespace("com.subnodal.writer", function(exports) {
    var subElements = require("com.subnodal.subelements");
    var requests = require("com.subnodal.subelements.requests");
    var l10n = require("com.subnodal.subelements.l10n");
    var cloud = require("com.subnodal.cloud.appsapi");
    var splash = require("com.subnodal.subui.splash");

    var localeResources;

    cloud.ready(function() {
        Promise.all([
            requests.getJson("/locale/en_GB.json"),
            requests.getJson("/locale/fr_FR.json"),
            requests.getJson("/locale/zh_CN.json")
        ]).then(function(resources) {
            localeResources = resources;
    
            return cloud.getLocaleCode();
        }).then(function(result) {
            subElements.init({
                languageResources: {
                    "en_GB": localeResources[0],
                    "fr_FR": localeResources[1],
                    "zh_CN": localeResources[2]
                },
                localeCode: result.localeCode || null,
                fallbackLocaleCode: "en_GB"
            });

            subElements.ready(function() {
                splash.finish();
            });
    
            document.querySelector("title").textContent = _("subnodalWriter");
        });
    });

    window.addEventListener("load", function() {
        cloud.init({
            appName: {
                "en_GB": "Subnodal Writer",
                "fr_FR": "Sousnœud Rédacteur",
                "zh_CN": "次结·写"
            },
            appNameShort: {
                "en_GB": "Writer",
                "fr_FR": "Rédacteur",
                "zh_CN": "写"
            },
            fallbackLocaleCode: "en_GB",
            openUrl: "https://writer.subnodal.com/?objectKey={objectKey}",
            associations: [
                {
                    extension: "writer",
                    documentTypeName: {
                        "en_GB": "Writer document",
                        "fr_FR": "Document Rédacteur",
                        "zh_CN": "写文档"
                    },
                    thumbnailUrl: "https://cloud.subnodal.com/media/thumbnails/writer.svg"
                }
            ]
        });
    });

    window._ = l10n.translate;
});