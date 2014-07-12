define(["require", "solaris/core"], function (require) {
    "use strict";

    return function (data) {
        var Solaris = require("solaris/core");

        var solaris = new Solaris(document.getElementById("solaris"), {
            center: 11,
            scale: 1
        });

        solaris.loadView("void");
        solaris.loadView("grid");
        solaris.loadView("system", data);

        /*
        // TODO fix me
        solaris.loadView("hypotrochoid", {sub: {
            sun: {sub: {
                venus: {orbit: {step:5, days:3000}},
                earth: {orbit: {step:5, days:3000}},
            }}
        }});
        */

        /*
        // planets, dwarfs and satellites
        solaris.loadView("system", {
            stars: {
                sun: {
                    planets: {
                        mercury: {orbit: true},
                        venus: {orbit: true},
                        earth: {
                            orbit: true,
                            satellites: {
                                moon: {orbit: true}
                            }
                        },
                        mars: {orbit: true},
                        jupiter: {orbit: true},
                        saturn: {orbit: true},
                        uranus: {orbit: true},
                        neptune: {orbit: true},
                        pluto: {orbit: true}
                    },
                    dwarfs: {
                        ceres: {orbit: true},
                        pallas: {orbit: true},
                        vesta: {orbit: true},
                        sedna: {orbit: true},
                        haumea: {orbit: true},
                        makemake: {orbit: true},
                        eris: {orbit: true}
                    }
                }
            }
        });
        */

        /*
        // planets only
        solaris.loadView("system", {
            stars: {
                sun: {
                    planets: {
                        mercury: {orbit: true},
                        venus: {orbit: true},
                        earth: {orbit: true},
                        mars: {orbit: true},
                        jupiter: {orbit: true},
                        saturn: {orbit: true},
                        uranus: {orbit: true},
                    }
                }
            }
        });
        */

        /*
        // dwarfs only
        solaris.loadView("system", {
            stars: {
                sun: {
                    dwarfs: {
                        ceres: {orbit: true},
                        pallas: {orbit: true},
                        vesta: {orbit: true},
                        sedna: {orbit: true},
                        haumea: {orbit: true},
                        makemake: {orbit: true},
                        eris: {orbit: true}
                    }
                }
            }
        });
        */

        /*
        solaris.loadView("system", {
            planets: {
                earth: {
                    label: true,
                    satellites: {
                        moon: {
                            label: {
                                color: "blue"
                            },
                            orbit: {
                                color: "red"
                            }
                        }
                    }
                }
            }
        });
        */

        return solaris;
    };

});