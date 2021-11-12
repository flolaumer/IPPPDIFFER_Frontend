const nodes = [
  {
    "id": 1,
    "name": "IB1",
    "color": "#000000",
    "children": [
      {
        "id": 2,
        "name": "releasedate",
        "color": "#000000",
        "value": "2021-10-08"
      },
      {
        "id": 3,
        "name": "ibnrequired",
        "color": "#000000",
        "value": "true"
      },
      {
        "id": 4,
        "name": "DOCUMENTINFO",
        "color": "#000000",
        "children": [
          {
            "id": 5,
            "name": "CONTACTS",
            "color": "#000000",
            "children": [
              {
                "id": 6,
                "name": "CONTACT",
                "color": "#000000",
                "children": [
                  {
                    "id": 7,
                    "name": "userid",
                    "color": "#000000",
                    "value": "abcdef"
                  },
                  {
                    "id": 8,
                    "name": "company",
                    "color": "#000000",
                    "value": "MyCompany"
                  },
                  {
                    "id": 9,
                    "name": "division",
                    "color": "#000000",
                    "value": "TE"
                  },
                  {
                    "id": 10,
                    "name": "department",
                    "color": "#000000",
                    "value": "AB-C/D"
                  },
                  {
                    "id": 11,
                    "name": "role",
                    "color": "#000000",
                    "value": "Arbeiter"
                  },
                  {
                    "id": 12,
                    "name": "mail",
                    "color": "#000000",
                    "value": "mm@web.de"
                  }
                ]
              },
              {
                "id": 13,
                "name": "CONTACT",
                "color": "#000000",
                "children": [
                  {
                    "id": 14,
                    "name": "userid",
                    "color": "#000000",
                    "value": "123456"
                  },
                  {
                    "id": 15,
                    "name": "company",
                    "color": "#000000",
                    "value": "MyGroup"
                  },
                  {
                    "id": 16,
                    "name": "division",
                    "color": "#000000",
                    "value": "IT"
                  },
                  {
                    "id": 17,
                    "name": "department",
                    "color": "#000000",
                    "value": "XYZ/1-2"
                  },
                  {
                    "id": 18,
                    "name": "role",
                    "color": "#000000",
                    "value": "Worker"
                  },
                  {
                    "id": 19,
                    "name": "mail",
                    "color": "#000000",
                    "value": "j_d@posteo.de"
                  }
                ]
              }
            ]
          },
          {
            "id": 20,
            "name": "DOCREVISIONS",
            "color": "#000000",
            "children": [
              {
                "id": 21,
                "name": "DOCREVISION",
                "color": "#000000",
                "children": [
                  {
                    "id": 22,
                    "name": "version",
                    "color": "#000000",
                    "value": "0_1"
                  },
                  {
                    "id": 23,
                    "name": "date",
                    "color": "#000000",
                    "value": "08.10.2021"
                  },
                  {
                    "id": 24,
                    "name": "REFERENCE",
                    "color": "#000000"
                  },
                  {
                    "id": 25,
                    "name": "change",
                    "color": "#000000",
                    "value": "Initialerstellung"
                  },
                  {
                    "id": 26,
                    "name": "tool",
                    "color": "#000000",
                    "value": "DWB_5_19_0"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": 27,
        "name": "IBDESCRIPTION",
        "color": "#000000",
        "children": [
          {
            "id": 28,
            "name": "IBVARIANTS",
            "color": "#000000",
            "children": [
              {
                "id": 29,
                "name": "IBVARIANT",
                "color": "#000000",
                "children": [
                  {
                    "id": 30,
                    "name": "productid",
                    "color": "#000000",
                    "value": ""
                  }
                ]
              },
              {
                "id": 31,
                "name": "IBVARIANT",
                "color": "#000000",
                "children": [
                  {
                    "id": 32,
                    "name": "productid",
                    "color": "#000000",
                    "value": "ABC"
                  },
                  {
                    "id": 33,
                    "name": "desc",
                    "color": "#000000",
                    "value": "nur für A"
                  }
                ]
              }
            ]
          },
          {
            "id": 34,
            "name": "validitiesref",
            "color": "#000000",
            "value": "IB1_00FF_DemoEcu_V0_1.tnr"
          },
          {
            "id": 35,
            "name": "OBJECTIVES",
            "color": "#000000",
            "children": [
              {
                "id": 36,
                "name": "String",
                "color": "#000000"
              },
              {
                "id": 37,
                "name": "String",
                "color": "#000000"
              }
            ]
          },
          {
            "id": 38,
            "name": "IBNZ",
            "color": "#000000",
            "children": [
              {
                "id": 39,
                "name": "ibnzestimation",
                "color": "#000000",
                "value": "55.0"
              },
              {
                "id": 40,
                "name": "ibnzcommitment",
                "color": "#000000",
                "value": "60.0"
              }
            ]
          },
          {
            "id": 41,
            "name": "SLAVES",
            "color": "#000000",
            "children": [
              {
                "id": 42,
                "name": "SLAVE",
                "color": "#000000",
                "children": [
                  {
                    "id": 43,
                    "name": "ecuid",
                    "color": "#000000",
                    "value": "603"
                  }
                ]
              },
              {
                "id": 44,
                "name": "SLAVE",
                "color": "#000000",
                "children": [
                  {
                    "id": 45,
                    "name": "ecuid",
                    "color": "#000000",
                    "value": "650"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": 46,
        "name": "ENVIRONMENT",
        "color": "#000000",
        "children": [
          {
            "id": 47,
            "name": "PRECONDITIONS",
            "color": "#000000",
            "children": [
              {
                "id": 48,
                "name": "PRECONDITION",
                "color": "#000000",
                "children": [
                  {
                    "id": 49,
                    "name": "pRelevant",
                    "color": "#000000",
                    "value": "true"
                  },
                  {
                    "id": 50,
                    "name": "kdRelevant",
                    "color": "#000000",
                    "value": "true"
                  }
                ]
              },
              {
                "id": 51,
                "name": "PRECONDITION",
                "color": "#000000",
                "children": [
                  {
                    "id": 52,
                    "name": "pRelevant",
                    "color": "#000000",
                    "value": "true"
                  },
                  {
                    "id": 53,
                    "name": "kdRelevant",
                    "color": "#000000",
                    "value": "false"
                  }
                ]
              }
            ]
          },
          {
            "id": 54,
            "name": "DEPENDENCIES",
            "color": "#000000",
            "children": [
              {
                "id": 55,
                "name": "String",
                "color": "#000000"
              }
            ]
          },
          {
            "id": 56,
            "name": "ACCESSAUTHORISATIONS",
            "color": "#000000",
            "children": [
              {
                "id": 57,
                "name": "ACCESSAUTHORISATION",
                "color": "#000000",
                "children": [
                  {
                    "id": 58,
                    "name": "desc",
                    "color": "#000000",
                    "value": "Mit PKI-Karte und PIN"
                  }
                ]
              }
            ]
          },
          {
            "id": 59,
            "name": "PRODUCTIONMODES",
            "color": "#000000",
            "children": [
              {
                "id": 60,
                "name": "PRODUCTIONMODE",
                "color": "#000000",
                "children": [
                  {
                    "id": 61,
                    "name": "BYTES",
                    "color": "#000000",
                    "children": [
                      {
                        "id": 62,
                        "name": "byte0",
                        "color": "#000000",
                        "value": "xxxxx1xx"
                      },
                      {
                        "id": 63,
                        "name": "byte1",
                        "color": "#000000",
                        "value": "0xxxxxxx"
                      },
                      {
                        "id": 64,
                        "name": "byte2",
                        "color": "#000000",
                        "value": "xxx1xxxx"
                      }
                    ]
                  }
                ]
              },
              {
                "id": 65,
                "name": "PRODUCTIONMODE",
                "color": "#000000",
                "children": [
                  {
                    "id": 66,
                    "name": "BYTES",
                    "color": "#000000",
                    "children": [
                      {
                        "id": 67,
                        "name": "byte0",
                        "color": "#000000",
                        "value": "x0xxxxxx"
                      },
                      {
                        "id": 68,
                        "name": "byte1",
                        "color": "#000000",
                        "value": "xxxxx0xx"
                      },
                      {
                        "id": 69,
                        "name": "byte2",
                        "color": "#000000",
                        "value": "xx11xxxx"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": 70,
            "name": "transportmode",
            "color": "#000000",
            "value": "Grün leuchten"
          }
        ]
      },
      {
        "id": 71,
        "name": "PROCEDURES",
        "color": "#000000",
        "children": [
          {
            "id": 72,
            "name": "PROCEDURE",
            "color": "#000000"
          },
          {
            "id": 73,
            "name": "PROCEDURE",
            "color": "#000000"
          }
        ]
      },
      {
        "id": 74,
        "name": "REFERENCES",
        "color": "#000000",
        "children": [
          {
            "id": 75,
            "name": "REGULATIONS",
            "color": "#000000",
            "children": [
              {
                "id": 76,
                "name": "DOC",
                "color": "#000000",
                "children": [
                  {
                    "id": 77,
                    "name": "name",
                    "color": "#000000",
                    "value": "MyRegulation"
                  },
                  {
                    "id": 78,
                    "name": "version",
                    "color": "#000000",
                    "value": "1.0"
                  },
                  {
                    "id": 79,
                    "name": "filesystem",
                    "color": "#000000",
                    "value": "Cloud"
                  }
                ]
              }
            ]
          },
          {
            "id": 80,
            "name": "RELATEDDOCUMENTS",
            "color": "#000000",
            "children": [
              {
                "id": 81,
                "name": "DOC",
                "color": "#000000",
                "children": [
                  {
                    "id": 82,
                    "name": "name",
                    "color": "#000000",
                    "value": "MyDocument"
                  },
                  {
                    "id": 83,
                    "name": "sparepartnumber",
                    "color": "#000000",
                    "value": "987.654.321.Z"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export default nodes;
