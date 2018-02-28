package elastest.loganalyzer.es.client;

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
		// String pattern =
		// "^((((\\d+).)+)(\\s)(\\w+)(\\s+)(\\S+)(\\s)((\\S*)((\\w+)|((\\s+)(\\w+)))(\\S*))(\\s*)(((\\w+).)+)(\\s*)(\\S*)(\\s*)(.*))$";
		String str = "2018-02-20 12:30:48.199  INFO   --- [           main] io.github.bonigarcia.wdm.BrowserManager  : Exporting webdriver.gecko.driver as /home/pablo/.m2/repository/webdriver/geckodriver/linux64/0.19.1/geckodriver";
		System.out.println(str.matches(pattern));
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
