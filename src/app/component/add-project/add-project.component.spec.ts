import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {AddProjectComponent} from './add-project.component';

describe('Component: Add Project', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;
  let projectName: DebugElement;
  let submit: DebugElement;
  let txtFile: File;
  let txtFileUploader: DebugElement;
  let xmlFile: File;
  let xmlFileUploader: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProjectComponent]
    });
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;

    projectName = fixture.debugElement.query(By.css('#project-name'));
    submit = fixture.debugElement.query(By.css('#submit'));
    txtFile = new File(['[INFO] Scanning for projects...\n' +
    '[INFO]\n' +
    '[INFO] ------------------------------------------------------------------------\n' +
    '[INFO] Building backend 0.5-SNAPSHOT\n' +
    '[INFO] ------------------------------------------------------------------------\n' +
    '[INFO]\n' +
    '[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ full-teaching ---\n' +
    '[INFO] Using \'UTF-8\' encoding to copy filtered resources.\n' +
    '[INFO] Copying 2 resources\n' +
    '[INFO] Copying 48 resources\n' +
    '[INFO]\n' +
    '[INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ full-teaching ---\n' +
    '[INFO] Nothing to compile - all classes are up to date\n' +
    '[INFO]\n' +
    '[INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ full-teaching ---\n' +
    '[INFO] Using \'UTF-8\' encoding to copy filtered resources.\n' +
    '[INFO] Copying 2 resources\n' +
    '[INFO]\n' +
    '[INFO] --- maven-compiler-plugin:3.1:testCompile (default-testCompile) @ full-teaching ---\n' +
    '[INFO] Nothing to compile - all classes are up to date\n' +
    '[INFO]\n' +
    '[INFO] --- maven-surefire-plugin:2.18.1:test (default-test) @ full-teaching ---\n' +
    '[INFO] Surefire report directory: /home/pablo/Desktop/full-teaching-experiment/target/surefire-reports\n' +
    '\n' +
    '-------------------------------------------------------\n' +
    ' T E S T S\n' +
    '-------------------------------------------------------\n' +
    'Running com.fullteaching.backend.e2e.FullTeachingTestE2EChat\n' +
    '2018-04-09 14:25:06.823  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Reading https://chro' +
    'medriver.storage.googleapis.com/ to seek [chromedriver]\n' +
    '2018-04-09 14:25:07.389  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Latest version of [c' +
    'hromedriver] is 2.37\n' +
    '2018-04-09 14:25:07.397  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Exporting webdriver.' +
    'chrome.driver as /home/pablo/.m2/repository/webdriver/chromedriver/linux64/2.37/chromedriver\n' +
    '2018-04-09 14:25:10.167  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Reading https://api.' +
    'github.com/repos/mozilla/geckodriver/releases to seek [wires, geckodriver]\n' +
    '2018-04-09 14:25:10.655  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Latest version of [w' +
    'ires, geckodriver] is 0.20.1\n' +
    '2018-04-09 14:25:10.664  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Exporting webdriver.' +
    'gecko.driver as /home/pablo/.m2/repository/webdriver/geckodriver/linux64/0.20.1/geckodriver\n' +
    '2018-04-09 14:25:10.664  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Using URL https://lo' +
    'calhost:5000/ to connect to openvidu-testapp\n' +
    '2018-04-09 14:25:10.768  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Reading https://chro' +
    'medriver.storage.googleapis.com/ to seek [chromedriver]\n' +
    '2018-04-09 14:25:11.031  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Latest version of [c' +
    'hromedriver] is 2.37\n' +
    '2018-04-09 14:25:11.031  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Exporting webdriver.' +
    'chrome.driver as /home/pablo/.m2/repository/webdriver/chromedriver/linux64/2.37/chromedriver\n' +
    '2018-04-09 14:25:11.600  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Reading https://api.' +
    'github.com/repos/mozilla/geckodriver/releases to seek [wires, geckodriver]\n' +
    '2018-04-09 14:25:11.969  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Latest version of [w' +
    'ires, geckodriver] is 0.20.1\n' +
    '2018-04-09 14:25:11.972  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Exporting webdriver.' +
    'gecko.driver as /home/pablo/.m2/repository/webdriver/geckodriver/linux64/0.20.1/geckodriver\n' +
    '2018-04-09 14:25:11.991  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : ##### Start test: on' +
    'eToOneChatInSessionChrome\n' +
    '2018-04-09 14:25:11.991  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Starting browser (ch' +
    'rome)\n' +
    '2018-04-09 14:25:12.670  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Navigating to https:' +
    '//localhost:5000/\n' +
    '2018-04-09 14:25:14.971  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Logging in user Teac' +
    'her with mail \'teacher@gmail.com\'\n' +
    '2018-04-09 14:25:19.298  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Logging in successfu' +
    'l for user Teacher\n' +
    '2018-04-09 14:25:20.298  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Teacher entering fir' +
    'st course\n' +
    '2018-04-09 14:25:21.472  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Teacher navigating t' +
    'o \'Sessions\' tab\n' +
    '2018-04-09 14:25:22.634  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Teacher getting into' +
    ' first session\n' +
    '2018-04-09 14:25:23.870  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Checking system mess' +
    'age ("Connected") for Teacher\n' +
    '2018-04-09 14:25:24.452  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Starting browser (ch' +
    'rome)\n' +
    '2018-04-09 14:25:24.819  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Navigating to https:' +
    '//localhost:5000/\n' +
    '2018-04-09 14:25:27.552  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Logging in user Stud' +
    'ent with mail \'student1@gmail.com\'\n' +
    '2018-04-09 14:25:31.519  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Logging in successfu' +
    'l for user Student\n' +
    '2018-04-09 14:25:36.058  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Checking system mess' +
    'age ("Student Imprudent has connected") for Teacher\n' +
    '2018-04-09 14:25:36.139  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Checking system mess' +
    'age ("Teacher Cheater has connected") for Student\n' +
    '2018-04-09 14:25:38.776  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Checking own message' +
    ' ("TEACHER CHAT MESSAGE") for Teacher\n' +
    '2018-04-09 14:25:38.965  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Checking another use' +
    'r\'s message ("TEACHER CHAT MESSAGE") for Student\n' +
    '2018-04-09 14:25:40.608  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Checking another use' +
    'r\'s message ("STUDENT CHAT MESSAGE") for Teacher\n' +
    '2018-04-09 14:25:40.809  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Checking own message' +
    ' ("STUDENT CHAT MESSAGE") for Student\n' +
    '2018-04-09 14:25:42.957  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Logging out Student\n' +
    '2018-04-09 14:25:44.760  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Logging out successf' +
    'ul for Student\n' +
    '2018-04-09 14:25:45.865  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Checking system mess' +
    'age ("Student Imprudent has disconnected") for Teacher\n' +
    '2018-04-09 14:25:45.934  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Logging out Teacher\n' +
    '2018-04-09 14:25:47.419  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Logging out successf' +
    'ul for Teacher\n' +
    '2018-04-09 14:25:48.552  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : ##### Finish test: o' +
    'neToOneChatInSessionChrome\n' +
    'Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 42.52 sec - in com.fullteaching.backend.e2e.FullTeach' +
    'ingTestE2EChat\n' +
    '\n' +
    'Results :\n' +
    '\n' +
    'Tests run: 1, Failures: 0, Errors: 0, Skipped: 0\n' +
    '\n' +
    '[INFO] ------------------------------------------------------------------------\n' +
    '[INFO] BUILD SUCCESS\n' +
    '[INFO] ------------------------------------------------------------------------\n' +
    '[INFO] Total time: 44.704 s\n' +
    '[INFO] Finished at: 2018-04-09T14:25:48+02:00\n' +
    '[INFO] Final Memory: 27M/482M\n' +
    '[INFO] ------------------------------------------------------------------------\n'], 'exec.txt', {
      type: 'text/plain'
    });
    txtFileUploader = fixture.debugElement.query(By.css('#txt-file-uploader'));
    xmlFile = new File(['<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<testsuite name="com.fullteaching.backend.e2e.FullTeachingTestE2EChat" time="36.583" tests="1" errors="0" skipped="0"' +
    ' failures="0">\n' +
    '  <properties>\n' +
    '    <property name="java.runtime.name" value="OpenJDK Runtime Environment"/>\n' +
    '    <property name="sun.boot.library.path" value="/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/amd64"/>\n' +
    '    <property name="java.vm.version" value="25.162-b12"/>\n' +
    '    <property name="java.vm.vendor" value="Oracle Corporation"/>\n' +
    '    <property name="maven.multiModuleProjectDirectory" value="/home/pablo/Desktop"/>\n' +
    '    <property name="java.vendor.url" value="http://java.oracle.com/"/>\n' +
    '    <property name="path.separator" value=":"/>\n' +
    '    <property name="guice.disable.misplaced.annotation.check" value="true"/>\n' +
    '    <property name="java.vm.name" value="OpenJDK 64-Bit Server VM"/>\n' +
    '    <property name="file.encoding.pkg" value="sun.io"/>\n' +
    '    <property name="user.country" value="US"/>\n' +
    '    <property name="sun.java.launcher" value="SUN_STANDARD"/>\n' +
    '    <property name="sun.os.patch.level" value="unknown"/>\n' +
    '    <property name="test" value="FullTeachingTestE2EChat"/>\n' +
    '    <property name="java.vm.specification.name" value="Java Virtual Machine Specification"/>\n' +
    '    <property name="user.dir" value="/home/pablo/Desktop/full-teaching-experiment"/>\n' +
    '    <property name="java.runtime.version" value="1.8.0_162-8u162-b12-0ubuntu0.16.04.2-b12"/>\n' +
    '    <property name="java.awt.graphicsenv" value="sun.awt.X11GraphicsEnvironment"/>\n' +
    '    <property name="java.endorsed.dirs" value="/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/endorsed"/>\n' +
    '    <property name="os.arch" value="amd64"/>\n' +
    '    <property name="java.io.tmpdir" value="/tmp"/>\n' +
    '    <property name="line.separator" value="&#10;"/>\n' +
    '    <property name="java.vm.specification.vendor" value="Oracle Corporation"/>\n' +
    '    <property name="os.name" value="Linux"/>\n' +
    '    <property name="classworlds.conf" value="/usr/share/maven/bin/m2.conf"/>\n' +
    '    <property name="sun.jnu.encoding" value="UTF-8"/>\n' +
    '    <property name="java.library.path" value="/usr/java/packages/lib/amd64:/usr/lib/x86_64-linux-gnu/jni:/lib/x86_64-' +
    'linux-gnu:/usr/lib/x86_64-linux-gnu:/usr/lib/jni:/lib:/usr/lib"/>\n' +
    '    <property name="java.specification.name" value="Java Platform API Specification"/>\n' +
    '    <property name="java.class.version" value="52.0"/>\n' +
    '    <property name="sun.management.compiler" value="HotSpot 64-Bit Tiered Compilers"/>\n' +
    '    <property name="os.version" value="4.13.0-38-generic"/>\n' +
    '    <property name="user.home" value="/home/pablo"/>\n' +
    '    <property name="user.timezone" value="Europe/Madrid"/>\n' +
    '    <property name="java.awt.printerjob" value="sun.print.PSPrinterJob"/>\n' +
    '    <property name="java.specification.version" value="1.8"/>\n' +
    '    <property name="file.encoding" value="UTF-8"/>\n' +
    '    <property name="user.name" value="pablo"/>\n' +
    '    <property name="java.class.path" value="/usr/share/maven/boot/plexus-classworlds-2.x.jar"/>\n' +
    '    <property name="java.vm.specification.version" value="1.8"/>\n' +
    '    <property name="sun.arch.data.model" value="64"/>\n' +
    '    <property name="java.home" value="/usr/lib/jvm/java-8-openjdk-amd64/jre"/>\n' +
    '    <property name="sun.java.command" value="org.codehaus.plexus.classworlds.launcher.Launcher -Dtest=FullTeachingTest' +
    'E2EChat -B test"/>\n' +
    '    <property name="java.specification.vendor" value="Oracle Corporation"/>\n' +
    '    <property name="user.language" value="en"/>\n' +
    '    <property name="awt.toolkit" value="sun.awt.X11.XToolkit"/>\n' +
    '    <property name="java.vm.info" value="mixed mode"/>\n' +
    '    <property name="java.version" value="1.8.0_162"/>\n' +
    '    <property name="java.ext.dirs" value="/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/ext:/usr/java/packages/lib/ext"/>\n' +
    '    <property name="securerandom.source" value="file:/dev/./urandom"/>\n' +
    '    <property name="sun.boot.class.path" value="/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/resources.jar:/usr/lib/jvm' +
    '/java-8-openjdk-amd64/jre/lib/rt.jar:/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/sunrsasign.jar:/usr/lib/jvm/java-8-op' +
    'enjdk-amd64/jre/lib/jsse.jar:/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/jce.jar:/usr/lib/jvm/java-8-openjdk-amd64/jre' +
    '/lib/charsets.jar:/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/jfr.jar:/usr/lib/jvm/java-8-openjdk-amd64/jre/classes"/>\n' +
    '    <property name="java.vendor" value="Oracle Corporation"/>\n' +
    '    <property name="maven.home" value="/usr/share/maven"/>\n' +
    '    <property name="file.separator" value="/"/>\n' +
    '    <property name="java.vendor.url.bug" value="http://bugreport.sun.com/bugreport/"/>\n' +
    '    <property name="sun.cpu.endian" value="little"/>\n' +
    '    <property name="sun.io.unicode.encoding" value="UnicodeLittle"/>\n' +
    '    <property name="sun.desktop" value="gnome"/>\n' +
    '    <property name="sun.cpu.isalist" value=""/>\n' +
    '  </properties>\n' +
    '  <testcase name="oneToOneChatInSessionChrome(TestInfo)" classname="E2E tests for FullTeaching chat" time="36.583"/>\n' +
    '</testsuite>\n'], 'exec.xml', {
      type: 'text/plain'
    });
    xmlFileUploader = fixture.debugElement.query(By.css('#xml-file-uploader'));
  });

  it('Should create the component', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Entering project name and its files emits project creation', () => {
    fixture.whenStable().then(() => {
      projectName.nativeElement.value = 'AngularTesting';
      txtFileUploader.triggerEventHandler('click', new Event('click'));
      xmlFileUploader.triggerEventHandler('click', new Event('click'));
      txtFileUploader.triggerEventHandler('update', txtFile);
      xmlFileUploader.triggerEventHandler('update', xmlFile);
      expect()
    });
  });
});
