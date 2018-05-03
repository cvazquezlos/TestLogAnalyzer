import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AddExecComponent} from './add-exec.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Project} from '../../../model/project.model';
import {ElasticsearchService} from '../../../service/elasticsearch.service';

describe('Component: Add Execution', () => {
  let component: AddExecComponent;
  let fixture: ComponentFixture<AddExecComponent>;
  let service: ElasticsearchService;
  let submit: DebugElement;
  let txtFile: File;
  let txtFileUploader: DebugElement;
  let xmlFile: File;
  let xmlFileUploader: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddExecComponent],
      providers: [ElasticsearchService]
    });
    fixture = TestBed.createComponent(AddExecComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ElasticsearchService);

    submit = fixture.debugElement.query(By.css('#submit'));
    txtFile = new File(['[INFO] Scanning for projects...\n' +
    '[INFO]                                                                         \n' +
    '[INFO] ------------------------------------------------------------------------\n' +
    '[INFO] Building backend 0.5-SNAPSHOT\n' +
    '[INFO] ------------------------------------------------------------------------\n' +
    '[INFO] \n' +
    '[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ full-teaching ---\n' +
    '[INFO] Using \'UTF-8\' encoding to copy filtered resources.\n' +
    '[INFO] Copying 2 resources\n' +
    '[INFO] Copying 48 resources\n' +
    '[INFO] \n' +
    '[INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ full-teaching ---\n' +
    '[INFO] Nothing to compile - all classes are up to date\n' +
    '[INFO] \n' +
    '[INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ full-teaching ---\n' +
    '[INFO] Using \'UTF-8\' encoding to copy filtered resources.\n' +
    '[INFO] Copying 2 resources\n' +
    '[INFO] \n' +
    '[INFO] --- maven-compiler-plugin:3.1:testCompile (default-testCompile) @ full-teaching ---\n' +
    '[INFO] Nothing to compile - all classes are up to date\n' +
    '[INFO] \n' +
    '[INFO] --- maven-surefire-plugin:2.18.1:test (default-test) @ full-teaching ---\n' +
    '[INFO] Surefire report directory: /home/pablo/Desktop/full-teaching-experiment/target/surefire-reports\n' +
    '\n' +
    '-------------------------------------------------------\n' +
    ' T E S T S\n' +
    '-------------------------------------------------------\n' +
    'Running com.fullteaching.backend.e2e.FullTeachingTestE2EVideoSession\n' +
    '2018-04-09 14:26:16.046  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Reading https://chro' +
    'medriver.storage.googleapis.com/ to seek [chromedriver]\n' +
    '2018-04-09 14:26:16.505  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Latest version of [c' +
    'hromedriver] is 2.37\n' +
    '2018-04-09 14:26:16.513  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Exporting webdriver.' +
    'chrome.driver as /home/pablo/.m2/repository/webdriver/chromedriver/linux64/2.37/chromedriver\n' +
    '2018-04-09 14:26:17.238  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Reading https://api.' +
    'github.com/repos/mozilla/geckodriver/releases to seek [wires, geckodriver]\n' +
    '2018-04-09 14:26:17.589  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Latest version of [w' +
    'ires, geckodriver] is 0.20.1\n' +
    '2018-04-09 14:26:17.596  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Exporting webdriver.' +
    'gecko.driver as /home/pablo/.m2/repository/webdriver/geckodriver/linux64/0.20.1/geckodriver\n' +
    '2018-04-09 14:26:17.596  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Using URL https://lo' +
    'calhost:5000/ to connect to openvidu-testapp\n' +
    '2018-04-09 14:26:17.700  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Reading https://chro' +
    'medriver.storage.googleapis.com/ to seek [chromedriver]\n' +
    '2018-04-09 14:26:17.999  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Latest version of [c' +
    'hromedriver] is 2.37\n' +
    '2018-04-09 14:26:18.000  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Exporting webdriver.' +
    'chrome.driver as /home/pablo/.m2/repository/webdriver/chromedriver/linux64/2.37/chromedriver\n' +
    '2018-04-09 14:26:18.673  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Reading https://api.' +
    'github.com/repos/mozilla/geckodriver/releases to seek [wires, geckodriver]\n' +
    '2018-04-09 14:26:19.028  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Latest version of [w' +
    'ires, geckodriver] is 0.20.1\n' +
    '2018-04-09 14:26:19.031  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Exporting webdriver.' +
    'gecko.driver as /home/pablo/.m2/repository/webdriver/geckodriver/linux64/0.20.1/geckodriver\n' +
    '2018-04-09 14:26:19.051  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : ##### Start test: on' +
    'eToOneVideoAudioSessionChrome\n' +
    '2018-04-09 14:26:19.051  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Starting browser (ch' +
    'rome)\n' +
    '2018-04-09 14:26:19.714  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Navigating to https:' +
    '//localhost:5000/\n' +
    '2018-04-09 14:26:22.021  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Logging in user Teac' +
    'her with mail \'teacher@gmail.com\'\n' +
    '2018-04-09 14:26:26.275  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Logging in successfu' +
    'l for user Teacher\n' +
    '2018-04-09 14:26:27.276  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Teacher entering fir' +
    'st course\n' +
    '2018-04-09 14:26:28.458  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Teacher navigating t' +
    'o \'Sessions\' tab\n' +
    '2018-04-09 14:26:29.617  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Teacher getting into' +
    ' first session\n' +
    '2018-04-09 14:26:31.815  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Teacher waiting for ' +
    'video in container \'div.participant\' to be playing\n' +
    '2018-04-09 14:26:31.870  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Starting browser (ch' +
    'rome)\n' +
    '2018-04-09 14:26:32.232  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Navigating to https:' +
    '//localhost:5000/\n' +
    '2018-04-09 14:26:34.812  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Logging in user Stud' +
    'ent with mail \'student1@gmail.com\'\n' +
    '2018-04-09 14:26:38.850  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Logging in successfu' +
    'l for user Student\n' +
    '2018-04-09 14:26:39.851  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Student entering fir' +
    'st course\n' +
    '2018-04-09 14:26:41.012  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Student navigating t' +
    'o \'Courses\' tab\n' +
    '2018-04-09 14:26:42.155  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Student getting into' +
    ' first session\n' +
    '2018-04-09 14:26:44.528  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Student waiting for ' +
    'video in container \'div.participant\' to be playing\n' +
    '2018-04-09 14:26:45.845  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Student asking for i' +
    'ntervention\n' +
    '2018-04-09 14:26:47.065  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Teacher accepts stud' +
    'ent intervention\n' +
    '2018-04-09 14:26:47.323  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Student waiting for ' +
    'video in container \'div.participant-small\' to be playing\n' +
    '2018-04-09 14:26:47.502  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Student waiting for ' +
    'video in container \'div.participant\' to be playing\n' +
    '2018-04-09 14:26:47.694  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Teacher waiting for ' +
    'video in container \'div.participant-small\' to be playing\n' +
    '2018-04-09 14:26:47.787  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Teacher waiting for ' +
    'video in container \'div.participant\' to be playing\n' +
    '2018-04-09 14:26:54.465  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Teacher canceling st' +
    'udent intervention\n' +
    '2018-04-09 14:26:58.598  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Logging out Student\n' +
    '2018-04-09 14:27:02.528  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Logging out successf' +
    'ul for Student\n' +
    '2018-04-09 14:27:03.631  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Logging out Teacher\n' +
    '2018-04-09 14:27:07.432  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : Logging out successf' +
    'ul for Teacher\n' +
    '2018-04-09 14:27:08.566  INFO   --- [           main] c.f.backend.e2e.FullTeachingTestE2E      : ##### Finish test: o' +
    'neToOneVideoAudioSessionChrome\n' +
    'Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 53.669 sec - in com.fullteaching.backend.e2e.FullTeac' +
    'hingTestE2EVideoSession\n' +
    '\n' +
    'Results :\n' +
    '\n' +
    'Tests run: 1, Failures: 0, Errors: 0, Skipped: 0\n' +
    '\n' +
    '[INFO] ------------------------------------------------------------------------\n' +
    '[INFO] BUILD SUCCESS\n' +
    '[INFO] ------------------------------------------------------------------------\n' +
    '[INFO] Total time: 56.115 s\n' +
    '[INFO] Finished at: 2018-04-09T14:27:08+02:00\n' +
    '[INFO] Final Memory: 27M/487M\n' +
    '[INFO] ------------------------------------------------------------------------\n'], 'exec.txt', {
      type: 'text/plain'
    });
    txtFileUploader = fixture.debugElement.query(By.css('#txt-file-uploader'));
    xmlFile = new File(['<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<testsuite name="com.fullteaching.backend.e2e.FullTeachingTestE2EVideoSession" time="49.532" tests="1" errors="0" ski' +
    'pped="0" failures="0">\n' +
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
    '    <property name="test" value="FullTeachingTestE2EVideoSession"/>\n' +
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
    '    <property name="sun.java.command" value="org.codehaus.plexus.classworlds.launcher.Launcher -Dtest=FullTeachingTes' +
    'tE2EVideoSession -B test"/>\n' +
    '    <property name="java.specification.vendor" value="Oracle Corporation"/>\n' +
    '    <property name="user.language" value="en"/>\n' +
    '    <property name="awt.toolkit" value="sun.awt.X11.XToolkit"/>\n' +
    '    <property name="java.vm.info" value="mixed mode"/>\n' +
    '    <property name="java.version" value="1.8.0_162"/>\n' +
    '    <property name="java.ext.dirs" value="/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/ext:/usr/java/packages/lib/ext"/>\n' +
    '    <property name="securerandom.source" value="file:/dev/./urandom"/>\n' +
    '    <property name="sun.boot.class.path" value="/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/resources.jar:/usr/lib/jvm/' +
    'java-8-openjdk-amd64/jre/lib/rt.jar:/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/sunrsasign.jar:/usr/lib/jvm/java-8-open' +
    'jdk-amd64/jre/lib/jsse.jar:/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/jce.jar:/usr/lib/jvm/java-8-openjdk-amd64/jre/li' +
    'b/charsets.jar:/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/jfr.jar:/usr/lib/jvm/java-8-openjdk-amd64/jre/classes"/>\n' +
    '    <property name="java.vendor" value="Oracle Corporation"/>\n' +
    '    <property name="maven.home" value="/usr/share/maven"/>\n' +
    '    <property name="file.separator" value="/"/>\n' +
    '    <property name="java.vendor.url.bug" value="http://bugreport.sun.com/bugreport/"/>\n' +
    '    <property name="sun.cpu.endian" value="little"/>\n' +
    '    <property name="sun.io.unicode.encoding" value="UnicodeLittle"/>\n' +
    '    <property name="sun.desktop" value="gnome"/>\n' +
    '    <property name="sun.cpu.isalist" value=""/>\n' +
    '  </properties>\n' +
    '  <testcase name="oneToOneVideoAudioSessionChrome(TestInfo)" classname="E2E tests for FullTeaching video session" tim' +
    'e="49.532"/>\n' +
    '</testsuite>'], 'exec.xml', {
      type: 'text/plain'
    });
    xmlFileUploader = fixture.debugElement.query(By.css('#xml-file-uploader'));
  });

  it('Should create the component', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Check constructor values', async () => {
    fixture.whenStable().then(async () => {
      expect(component.project).toBeUndefined();
      if (component.project === undefined) {
        const project = new Project();
        project.name = 'JasmineTestingProject';
        project.id = 99999999;
        component.project = project;
      }
      txtFileUploader.nativeElement.value = txtFile;
      xmlFileUploader.nativeElement.value = xmlFile;
      submit.triggerEventHandler('click', null);
      expect(txtFileUploader.nativeElement.value).toBe(txtFile);
      expect(xmlFileUploader.nativeElement.value).toBe(xmlFile);
    });
  });
});
