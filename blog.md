# Multiplication prototype blog

## 2012-07-02 Abgrenzung Selenium/Unit tests

Hier nochmal explizit, weil ich gerde selbst nicht dran gedacht habe:

* Die Unit Tests testen das ViewModel ***OHNE*** HTML-Seite
* Die Selenium-Tests testen ***die HTML-Seite***

Also brauchen die Selenium Tests nichts duplizieren, was Logik um ViewModel ist. Sie überprüen allerdings, ob das ViewModel korrekt in HTML mit Databinding dargestellt wird.


## 2012-07-02 Rückenwind!

Nach einem kleinen Miniproblem (ich darf im viewmodel.js das Model noch nicht ans HTML binden, sonst kracht's im HTML-losen Unit test) habe ich jetzt Testdriven die game-Seite weiterentwickelt.

* Es gibt erste Rechenaufgaben
* Die Zählung der Aufgabe beginnt bei 1
* Ein Test überprüft, dass es auch wirklich 10 Aufgaben sind
* Ein Test überprüft, ob das Ergebnis korrekt verglichen wird

Ein problem waren ein String-gegen-Zahlenvergleich in JS, ein parseInt hat hier für Abhilfe gesorgt. Und, oh Wunder sogleich hat travis-cs mittels jshint sein erstes ***echtes Problem*** in meinem Source gefunden. (parseInt will einen Radix).

Travis-ci sagt mir gerade, es ist alles grün.


## 2012-07-02 Timeout, hurra!

Ja, es war der Timeout warum im Selenium-Test das zweite findelement nicht geklappt hat.
Timeout auf 10s gesetzt, jetzt läuft der Test auch auch travis-ci durch.

## 2012-07-02 Selenium auf travis-ci

Ich habe gerade für Florian's selenium-test die scripts angepasst, die ich bei js-test-driver-phantomjs gefunden hatte und für travis den X-Server konfiguriert. Jetzt kann man die Selenium-Tests auch auf travis-ci starten, ***allerdings*** bricht der eine Test, da er einen Link auf der game-seite nicht finden kann. Fehlt da ein wait for page? Oder ein entsprechender Timeout? Im Büro gab es neulich ähnliche Probleme mit Selenium-Tests auf unserer langsamsten Maschine, ich frage dort noch mal nach der Lösung.

## 2012-07-01 Tests mit js-test-driver

Nachdem die jasmine-tests nicht direkt in Idea zu testen waren habe ich noch einmal mit den Tests rumgespielt und bin jetzt bei js-test-driver gelandet. Diesen kann man über [js-test-driver-phantomjs](https://github.com/larrymyers/js-test-driver-phantomjs) auch headless auf travis-ci laufen lassen, es ist nur etwas Shellscriptpopelei.

js-test-driver integriert sich - wenn man will - auch wunderbar mit einer ganzen Reihe von anderen Testframeworks und kann mit mehreren Browsern testen. (Aufgabe für den geneigten Leser: Die Tests auf travis-ci auf phantomjs UND firefox laufen lassen …)

## 2012-06-27 Fixing tests
Seit gerade eben laufen die Tests auf travis-ci erfolgreich durch. Es gab mehrere Gründe, warum dem bisher nicht so war:

* Der html- oder consoleReporter hat nicht funktioniert, phantom.js hatte dann einen Timeout (obwohl die Tests "Passed" waren)
* Diverse kleine Einstellungs- und Scriptproblemchen im Umfeld der Unittests


## 2012-06-25 Databinding

Juhu, es gibt ein elementares UI, das erste Viewmodel wird mit Knockout angesprochen, es gibt test-specs die Zugriff auf das Viewmodel haben und es gibt unerledigte Aufgaben: Wir können anfangen, Tests zu schreiben um Funktionalität einzubauen.

## 2012-06-25 Lint
Im Grunt-Script ist jetzt lint (jshint) auch dabei. Mit

    grunt server watch
    
läßt sich ein Webserver starten und das Build-Script im "watch" Modus betreiben, damit bei jedem Speichern kompiliert wird. Jetzt können wir anstelle der expliziten Libraries
auch die minifizierten in der Seite verwenden.

Überlegung: So etwas wie requirejs könnte Browserseitig gut tun, mit der Javascript-Art von "ich verwende mal ein paar benannte globale Variablen, die das HTML per Script-Tag vorher geladen hat" mach mir ein bisschen Magengrummeln.



## 2012-06-25 Travis CI

Heute habe ich zwar nichts gemacht, Joe hat sich aber (offenbar erfolgreich) angesehen, wie man alles unter Travis-CI zum Laufen bringt.

## 2012-06-23 Jasmine runs

	froh@Jules:~/dev/multi$ grunt jasmine
	Running "jasmine:all" (jasmine) task
	>> 0 assertions passed in 0 specs (0ms)

## 2012-06-23 Testing

Für Multi habe wir letzen Mittwoch geplant, ein kompletten Durchstich für Tests zu schreiben. Mir fällt dabei auf, dass ich schon eine Story als erledigt markiert habe, aber noch keine Tests dafür geschrieben. Why? Vermutlich weil ich noch keine Definition of Done habe.

Also:

* Eine Definition of done muß her
* Die existierende, abgeschlossene Story muß nochmal zurück

### Definiton of Done

Eine Story ist genau dann fertig, wenn:

* Sie das erfüllt, was ich mir vorgestellt habe. (Im echten Leben: Sie erfüllt die vorher definierten Confirmations)
* Es einen Test gibt, der die geforderten Dinge nachweist

Wupps. Ich brauche also schnell für die erste Story einen Test (oder lasse sie wie unten erwähnt auf UI Test stehen). Egal, ich brauche in jedem Falle für die AKTUELLE Story einen Test, damit ich sie abschließen kann. Ein Testframework muß her, aber schnell! Ich mach's mir einfach und klaue einfach das, was auch knockout.js verwendet - schließlich ist das meine Hauptlibrary und vielleicht kann ich ja dann bei knockout abschreiben, wenn ich mal nicht weiter weiß wie ich einen Test erstellen soll.


## 2012-06-23 Testkandidaten für UI Tests markiert

Im (Backlog)[backlog.md] habe ich jetzt für die (eine, simple) erledigten Story die Confirmation aufgeschrieben, durch die die Story erfüllt ist. Beachte: In meinem Backlog gibt es keine Confirmations bei den offenen Stories, denn ich bin in diesem Tool ja selbst Anforderungsgeber und Entwickler in Personalunion, brauche daher als Anforderer
keine Confirmations schreiben um den Entwickler zu sagen was zu tun ist. Im Nachhinein ist es aber interessant zu sehen, WARUM eine Story erfüllt ist - und im aktuellen Fall ist das auch gleich ein Kandidat für einen Test. Da es eine UI-Geschichte ist, ein Kandidat für Flo's Selenium Test.

## 2012-06-20 Ziel, Hello Github

### Ziel

In zwei Wochen, am 4.7.2012 ist der nächste [Workshop Softwarearchitektur](http://workshop-softwarearchitektur.de) bei den IT-Agenten.

Unser Fokus ist Qualität und Testing, am Beispiel eine kleinen Javascript-Applikation wollen wir folgendes zeigen:

* Ausgereiftes Deployment von Anfang an
* Unit-Testing mit JUnit bis in die UI-Logik
* Automatisierte UI-Tests mit Selenium
* Continuous integration

Als Showcase dient *multi*.

Es gibt einen Meilenstein, das ist die zweite Telco zur Vorbereitung am nächsten Mittwoch den 27.6.2012 um 20.00h. 

### Hello Github

Multi ist jetzt auf Github öffentlich verfügbar. Um lange Suchen nach einer passenden Lizenz zu vermeiden, habe ich alles einfach eine möglichst großzügige MIT-Lizenz für den aktuellen Stand [verwendet](LICENSE).


## 2012-06-18 Planning

Ich lege die blog.md und die plan.md an, jetzt habe ich ein kleines Backlog:

* I can launch the game in the browser, click on the start game link on the home screen and proceed to the game screen
* On the game screen I see one excercise and have to enter the correct solution to proceed. The Page gives feedback whether the soulution is correct.
* Each time the user enters the game screen a new, random exercise is created.

Der erste Task ist bereits erfüllt, den kann ich abhaken. Wie geht es von hier aus weiter? In Babysteps. Der nächste Task, verlangt, dass ich auf der Spieleseite eine beliebige (aber feste) Aufgabe anzeige, den Benutzer das Ergebnis eingeben lasse und bei korrektem Ergebnis etwas tue. (Was bei einem falschen Ergebnis passiert bleibt offen.)

So eine zielgerichtete Formulierung zwingt mich zur Disziplin, hier brauchen wir kein Domänenmodell und keine irre Datenhaltung, es reicht eine einfach HTML-Seite die "4*6" anzeigt und in einem Inputfeld auswertet ob das Ergebnis 42 ist. Für letzteren Anteil kann ich aber schon knockout.js einsetzen.

## 2012-06-17 Hello Entwicklungsumgebung

Einer Empfehlung von Heribert folgend setze ich zuallererst die Entwicklungsumgebung und eine Hello-World Seite auf. Ich finde und installiere grunt.js als Buildsystem, lege mir eine Projektstruktur zurecht und importiere die knockoutjs less.js und Twitter Bootstrap.

## 2012-06-17 Idee

Als kleines Übungsprojekt werde ich einen 1x1 Trainer in Javascript bauen. Ich stelle mir vor, dass der Trainer die jeweils 10 am schlechtesten trainierten Aufgaben abfragt, der Benutzer muß in einem Eingabefeld jeweils die korrekte Lösung der Aufgabe eintragen.

Als Bewertungskriterium verwendet der Trainer die Zeit, die der Benutzer braucht um eine Frage korrekt zu beantworten. (Ich kann mir noch etwas ausdenken um falsche Antworten zu bestrafen, z.B. eine 3-Sekunden Sperre des Eingabefeldes)

