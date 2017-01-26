(function() {
    'use strict';

    angular.module('teacherProfileModule')
        .controller('TeacherTrainingsController', function() {
            var vm = this;

            vm.getAnswerClass = function(answer) {
                var basic = 'callout answer ';
                if (angular.isDefined(vm.currentAnswer) && vm.currentAnswer === answer) {
                    if (vm.currentAnswer.isValid) {
                        return basic + 'success';
                    } else {
                        return basic + 'alert';
                    }
                } else if (!vm.hadResponse) {
                    return basic + 'small hvr-float-shadow';
                } else {
                    return basic + 'small secondary';
                }
            };

            vm.response = function(answer) {
                if (!vm.hadResponse) {
                    vm.hadResponse = true;
                    vm.currentAnswer = answer;
                    if (answer.isValid) {
                        vm.correctAnswers.push(answer);
                    } else {
                        vm.wrongAnswers.push(answer);
                    }
                }
            };

            vm.nextQuestion = function() {
                vm.currentAnswer = undefined;
                vm.hadResponse = false;
                if (vm.currentQuestion + 1 === vm.exam.questions.length) {
                    vm.hadFinished = true;
                } else {
                    vm.currentQuestion++;
                }
            }

            function initCtrl() {
                vm.exam = {
                    "id": 1,
                    "questions": [{
                            "answers": [{
                                    "answerText": "Tener tiempo para preparar, manejar el tema y tener disponibilidad para dictar la asesoría",
                                    "isValid": true
                                },
                                {
                                    "answerText": "Saber que domino el tema a la perfeccion y que no me demoraré preparando la clase",
                                    "isValid": false
                                },
                                {
                                    "answerText": "Que tengo el tiempo para darla y que manejo los temas",
                                    "isValid": false
                                },
                                {
                                    "answerText": "Saber si es un estudiante de universidad o de colegio",
                                    "isValid": false
                                }
                            ],
                            "questionText": "¿Qué debes tener en cuenta para aceptar tomar un servicio de asesoría académica?"
                        },
                        {
                            "answers": [{
                                    "answerText": "Preparar adecuadamente los temas y la metodología, y organizar mi tiempo adecuadamente",
                                    "isValid": true
                                },
                                {
                                    "answerText": "Preparar ejemplos y ejercicios.",
                                    "isValid": false
                                },
                                {
                                    "answerText": "Hacer los ejercicios que me enviaron",
                                    "isValid": false
                                },
                                {
                                    "answerText": "Verificar día y hora de la asesoría",
                                    "isValid": false
                                }
                            ],
                            "questionText": "¿Que debes hacer antes de asistir a un servicio de asesoría académica que aceptaste?"
                        },
                        {
                            "answers": [{
                                    "answerText": "Dar las gracias por confiar en Tu Profe",
                                    "isValid": false
                                },
                                {
                                    "answerText": "Cobrar",
                                    "isValid": false
                                },
                                {
                                    "answerText": "Llenar el formulario de servicio postventa y retroalimentar al estudiante",
                                    "isValid": true
                                },
                                {
                                    "answerText": "Dar una retroalimentación al estudiante y a los papás",
                                    "isValid": false
                                }
                            ],
                            "questionText": "¿Qué debes hacer tan pronto como termines un servicio de asesoría?"
                        },
                        {
                            "answers": [{
                                    "answerText": "Acepto",
                                    "isValid": false
                                },
                                {
                                    "answerText": "Rechazo",
                                    "isValid": true
                                },
                                {
                                    "answerText": "Cobro más",
                                    "isValid": false
                                },
                                {
                                    "answerText": "Le digo a otra persona que lo haga",
                                    "isValid": false
                                }
                            ],
                            "questionText": "Un estudiante te llama para que termines un trabajo y te ofrece $200.000 ¿Qué haces?"
                        },
                        {
                            "answers": [{
                                    "answerText": "La programo yo",
                                    "isValid": false
                                },
                                {
                                    "answerText": "Indico a Tu Profe que se comunique con el estudiante",
                                    "isValid": false
                                },
                                {
                                    "answerText": "Le digo al estudiante que se comunique con Tu Profe",
                                    "isValid": true
                                },
                                {
                                    "answerText": "No le contesto",
                                    "isValid": false
                                }
                            ],
                            "questionText": "Un estudiante de Tu Profe te llama directamente a ti para programar una asesoría ¿Qué haces?"
                        },
                        {
                            "answers": [{
                                    "answerText": "Comunicar inmediatamente a Tu Profe para que genere la cuenta de cobro",
                                    "isValid": true
                                },
                                {
                                    "answerText": "Recibir el dinero directamente antes de continuar",
                                    "isValid": false
                                },
                                {
                                    "answerText": "No dar la hora adicional",
                                    "isValid": false
                                },
                                {
                                    "answerText": "No cobrar la hora adicional",
                                    "isValid": false
                                }
                            ],
                            "questionText": "El tiempo de la asesoría ha terminado y el estudiante manifiesta que desea pagar una hora adicional ¿Qué haces?"
                        },
                        {
                            "answers": [{
                                    "answerText": "Tener mis datos actualizados y validar las liquidaciones que envía Tu Profe quincenalmente",
                                    "isValid": true
                                },
                                {
                                    "answerText": "Enviar un correo de cobro a la División de Pagos de Tu Profe cada vez que termino una asesoría",
                                    "isValid": false
                                },
                                {
                                    "answerText": "Esperar a que me paguen",
                                    "isValid": false
                                },
                                {
                                    "answerText": "Preguntar por WhatsApp cuándo me pagan",
                                    "isValid": false
                                }
                            ],
                            "questionText": "¿Qué debes hacer tú para recibir el pago de tus servicios por parte de Tu Profe?"
                        },
                        {
                            "answers": [{
                                    "answerText": "Porque uno de los fines de Tu Profe es fomentar una cultura de la acción voluntaria",
                                    "isValid": true
                                },
                                {
                                    "answerText": "Porque debemos aportar a la sociedad",
                                    "isValid": false
                                },
                                {
                                    "answerText": "Porque de esa manera Tu Profe deduce impuestos",
                                    "isValid": false
                                },
                                {
                                    "answerText": "Porque se debe probar nuestra calidad para dar asesorías",
                                    "isValid": false
                                }
                            ],
                            "questionText": "¿Por qué Tu Profe exige donar 6 horas de tu tiempo semestralmente a estudiantes que no tienen el dinero para pagar por el servicio?"
                        }
                    ],
                    "type": "linkUp"
                };
                vm.currentQuestion = 0;
                vm.currentAnswer = undefined;
                vm.correctAnswers = [];
                vm.wrongAnswers = [];
                vm.hadFinished = false;
                vm.hadResponse = false;
            }

            initCtrl();
        });
})();