package elastest.loganalyzer.es.client;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
@Import(EsConfiguration.class)
public class App {

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
		String timestamp = "(((\\d+).)+)";
		String level = "(\\w+)";
		String thread = "((\\S*)((\\w+)|((\\s+)(\\w+)))(\\S*))";
		String logger = "(((\\w+).)+)";
		String message = "(.*)";
		String spaces = "(\\s+)";
		String noSpaces = "(\\S+)";
		String divider = "(\\S*)";
		String pattern = "^" + timestamp + spaces + level + spaces + noSpaces + spaces + divider + thread + divider
				+ spaces + logger + spaces + divider + spaces + message + "$";
		Pattern target = Pattern.compile(pattern);
		// String pattern =
		// "^((((\\d+).)+)(\\s)(\\w+)(\\s+)(\\S+)(\\s)((\\S*)((\\w+)|((\\s+)(\\w+)))(\\S*))(\\s*)(((\\w+).)+)(\\s*)(\\S*)(\\s*)(.*))$";
		String str = "2018-02-20 12:30:48.199  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Exporting webdriver.gecko.driver as /home/pablo/.m2/repository/webdriver/geckodriver/linux64/0.19.1/geckodriver";
		Matcher matcher = target.matcher(str);
		if (matcher.find()) {
			System.out.println(matcher.group(1));
			System.out.println(matcher.group(5));
			System.out.println(matcher.group(12));
			System.out.println(matcher.group(20));
			System.out.println(matcher.group(26));
		}
		pattern = "Running" + spaces + message;
		Pattern starting = Pattern.compile(pattern);
		str = "Running com.fullteaching.backend.e2e.FullTeachingTestE2EChat";
		matcher = starting.matcher(str);
		if (matcher.find()) {
			System.out.println(matcher.group(2));
		}
	}

	@Bean
	public WebMvcConfigurerAdapter corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST", "OPTIONS", "PUT", "DELETE")
						.allowedHeaders("Content-Type", "X-Requested-With", "accept", "Origin",
								"Access-Control-Request-Method", "Access-Control-Request-Headers")
						.exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials")
						.allowCredentials(true).maxAge(3600);
			}
		};
	}
}
